using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Newtonsoft.Json;
using DataAccessLayer;
using DataAccessLayer.Dto;

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

        public IEnumerable<PropMetadata> Add(IEnumerable<PropMetadata> propMetadata)
        {
            Unit.RepPropMetadata.Add(propMetadata);

            return propMetadata;
        }

        public PropMetadata Get(Expression<Func<PropMetadata, bool>> where = null)
        {
            PropMetadata t = Unit.RepPropMetadata.Get(where, "Model");

            return t;
        }

        public IEnumerable<PropMetadata> GetAll(Expression<Func<PropMetadata, bool>> where = null)
        {
            IEnumerable<PropMetadata> propMetadatas = Unit.RepPropMetadata.GetAll(where,"Model");

            return propMetadatas;
        }

        public void Delete(int id)
        {
            PropMetadata t = Unit.RepPropMetadata.Get(p => p.IdPropMetadata==id);
            Unit.RepPropMetadata.Delete(t);
        }
    }
}
