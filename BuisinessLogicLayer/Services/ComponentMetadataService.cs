using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Newtonsoft.Json;
using DataAccessLayer;
using DataAccessLayer.Dto;
using System.Linq;

namespace BuisinessLogicLayer.Services
{
    public class ComponentMetadataService : BaseService, IComponentMetadataService
    {
         public IPropMetadataService PropMetadataService { get; set; }

        public ComponentMetadataService(IUnitOfWork unit, IPropMetadataService propMetadataService) : base(unit)
        {
          PropMetadataService = propMetadataService;

        }

        public ComponentMetadata Add(ComponentMetadata componentMetadata)
        {
             componentMetadata.ModelPropMetadata = null;
            Unit.RepComponentMetadata.Add(componentMetadata);

            return componentMetadata;
        }

        public ComponentMetadata Update(ComponentMetadata componentMetadata)
        {
              PropMetadataService.Update( componentMetadata.IdComponentMetadata, componentMetadata.Props);
             componentMetadata.ModelPropMetadata = null;
            int res = Unit.RepComponentMetadata.Update(componentMetadata);

            return componentMetadata;
        }

        public IEnumerable<ComponentMetadata> Update(IEnumerable<ComponentMetadata> componentMetadatas)
        {
            foreach(ComponentMetadata item in componentMetadatas)
            {              PropMetadataService.Update( item.Props);

             item.ModelPropMetadata = null;
            }

            int res = Unit.RepComponentMetadata.Update(componentMetadatas);

            return componentMetadatas;
        }

        public IEnumerable<ComponentMetadata> Update(int idMaster, IEnumerable<ComponentMetadata> componentMetadatas)
        {
            IEnumerable<int> existedIds = Unit.RepComponentMetadata.GetIds(i => i.IdFormMetadata == idMaster, i => i.IdComponentMetadata);
            
            foreach (ComponentMetadata item in componentMetadatas)
            {
                if (existedIds.Any(c => c == item.IdComponentMetadata))
                {
                    Update(item);
                }
                else
                {
                    Add(item);
                }
            }

            foreach (int existedId in existedIds)
            {
                if (!componentMetadatas.Any(c => c.IdComponentMetadata == existedId))
                {
                    Delete(existedId);
                }
            }

            return componentMetadatas;
        }

        public IEnumerable<ComponentMetadata> Add(IEnumerable<ComponentMetadata> componentMetadata)
        {
            Unit.RepComponentMetadata.Add(componentMetadata);

            return componentMetadata;
        }

        public ComponentMetadata Get(Expression<Func<ComponentMetadata, bool>> where = null)
        {
            ComponentMetadata t = Unit.RepComponentMetadata.Get(where, "ModelPropMetadata", "Props", "FormMetadata");

            return t;
        }

        public IEnumerable<ComponentMetadata> GetAll(Expression<Func<ComponentMetadata, bool>> where = null)
        {
            IEnumerable<ComponentMetadata> componentMetadatas = Unit.RepComponentMetadata.GetAll(where,"FormMetadata");

            return componentMetadatas;
        }

        public IEnumerable<ComponentMetadata> GetByMaster(int idMaster)
        {
            IEnumerable<ComponentMetadata> componentMetadatas = Unit.RepComponentMetadata.GetAll( x => x.IdFormMetadata == idMaster, "FormMetadata");

            return componentMetadatas;
        }


        public void Delete(int id)
        {
            ComponentMetadata t = Unit.RepComponentMetadata.Get(p => p.IdComponentMetadata==id);
            Unit.RepComponentMetadata.Delete(t);
        }
    }
}
