using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Newtonsoft.Json;
using DataAccessLayer;
using DataAccessLayer.Dto;

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
            Unit.RepComponentMetadata.Add(componentMetadata);

            return componentMetadata;
        }

        public ComponentMetadata Update(ComponentMetadata componentMetadata)
        {
              PropMetadataService.Update(componentMetadata.Props);

            int res = Unit.RepComponentMetadata.Update(componentMetadata);

            return componentMetadata;
        }

        public IEnumerable<ComponentMetadata> Update(IEnumerable<ComponentMetadata> componentMetadatas)
        {
            foreach(ComponentMetadata item in componentMetadatas)
            {

              PropMetadataService.Update(item.Props);
            }

            int res = Unit.RepComponentMetadata.Update(componentMetadatas);

            return componentMetadatas;
        }

        public IEnumerable<ComponentMetadata> Add(IEnumerable<ComponentMetadata> componentMetadata)
        {
            Unit.RepComponentMetadata.Add(componentMetadata);

            return componentMetadata;
        }

        public ComponentMetadata Get(Expression<Func<ComponentMetadata, bool>> where = null)
        {
            ComponentMetadata t = Unit.RepComponentMetadata.Get(where, "ModelPropMetadata", "Props");

            return t;
        }

        public IEnumerable<ComponentMetadata> GetAll(Expression<Func<ComponentMetadata, bool>> where = null)
        {
            IEnumerable<ComponentMetadata> componentMetadatas = Unit.RepComponentMetadata.GetAll(where,"ModelPropMetadata");

            return componentMetadatas;
        }

        public void Delete(int id)
        {
            ComponentMetadata t = Unit.RepComponentMetadata.Get(p => p.IdComponentMetadata==id);
            Unit.RepComponentMetadata.Delete(t);
        }
    }
}
