using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using DataAccessLayer;
using DataAccessLayer.Dto;

namespace BuisinessLogicLayer.Services
{
    public interface IPropMetadataService
    {

        PropMetadata Add(PropMetadata propMetadata);

        PropMetadata Update(PropMetadata propMetadata); 

        IEnumerable<PropMetadata> Update(IEnumerable<PropMetadata> propMetadatas);

        IEnumerable<PropMetadata> Update(int idMaster, IEnumerable<PropMetadata> propMetadatas);

        PropMetadata Get(Expression<Func<PropMetadata, bool>> where = null);

        IEnumerable<PropMetadata> GetAll(Expression<Func<PropMetadata, bool>> where = null);

        IEnumerable<PropMetadata> GetByMaster(int idMaster);


        void Delete(int id);
    }
}
