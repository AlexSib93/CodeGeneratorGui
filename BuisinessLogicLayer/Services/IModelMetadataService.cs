using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using DataAccessLayer;
using DataAccessLayer.Dto;

namespace BuisinessLogicLayer.Services
{
    public interface IModelMetadataService
    {

        ModelMetadata Add(ModelMetadata modelMetadata);

        ModelMetadata Update(ModelMetadata modelMetadata); 

        IEnumerable<ModelMetadata> Update(IEnumerable<ModelMetadata> modelMetadatas);

        IEnumerable<ModelMetadata> Update(int idMaster, IEnumerable<ModelMetadata> modelMetadatas);

        ModelMetadata Get(Expression<Func<ModelMetadata, bool>> where = null);

        IEnumerable<ModelMetadata> GetAll(Expression<Func<ModelMetadata, bool>> where = null);

        IEnumerable<ModelMetadata> GetByMaster(int idMaster);


        void Delete(int id);
    }
}
