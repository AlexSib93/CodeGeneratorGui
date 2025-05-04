using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Newtonsoft.Json;
using DataAccessLayer;
using DataAccessLayer.Dto;
using System.Linq;

namespace BuisinessLogicLayer.Services
{
    public class PropMetadataService : BaseService, IPropMetadataService
    {


        public PropMetadataService(IUnitOfWork unit) : base(unit)
        {


        }

        public PropMetadata Add(PropMetadata propMetadata)
        {
            Unit.RepPropMetadata.Add(propMetadata);

            return propMetadata;
        }

        public PropMetadata Update(PropMetadata propMetadata)
        {

            int res = Unit.RepPropMetadata.Update(propMetadata);

            return propMetadata;
        }

        public IEnumerable<PropMetadata> Update(IEnumerable<PropMetadata> propMetadatas)
        {
            foreach(PropMetadata item in propMetadatas)
            {

            }

            int res = Unit.RepPropMetadata.Update(propMetadatas);

            return propMetadatas;
        }

        public IEnumerable<PropMetadata> Update(int idMaster, IEnumerable<PropMetadata> propMetadatas)
        {
            IEnumerable<int> existedIds = Unit.RepPropMetadata.GetIds(i => i.IdModelMetadata == idMaster, i => i.IdPropMetadata);
            
            foreach (PropMetadata item in propMetadatas)
            {
                if (existedIds.Any(c => c == item.IdPropMetadata))
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
                if (!propMetadatas.Any(c => c.IdPropMetadata == existedId))
                {
                    Delete(existedId);
                }
            }

            return propMetadatas;
        }

        public IEnumerable<PropMetadata> Add(IEnumerable<PropMetadata> propMetadata)
        {
            Unit.RepPropMetadata.Add(propMetadata);

            return propMetadata;
        }

        public PropMetadata Get(Expression<Func<PropMetadata, bool>> where = null)
        {
            PropMetadata t = Unit.RepPropMetadata.Get(where, "ModelMetadata");

            return t;
        }

        public IEnumerable<PropMetadata> GetAll(Expression<Func<PropMetadata, bool>> where = null)
        {
            IEnumerable<PropMetadata> propMetadatas = Unit.RepPropMetadata.GetAll(where,"ModelMetadata");

            return propMetadatas;
        }

        public IEnumerable<PropMetadata> GetByMaster(int idMaster)
        {
            IEnumerable<PropMetadata> propMetadatas = Unit.RepPropMetadata.GetAll( x => x.IdModelMetadata == idMaster, "ModelMetadata");

            return propMetadatas;
        }


        public void Delete(int id)
        {
            PropMetadata t = Unit.RepPropMetadata.Get(p => p.IdPropMetadata==id);
            Unit.RepPropMetadata.Delete(t);
        }
    }
}
