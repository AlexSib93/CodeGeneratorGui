using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using DataAccessLayer;
using DataAccessLayer.Dto;

namespace BuisinessLogicLayer.Services
{
    public interface IFormMetadataService
    {

        FormMetadata Add(FormMetadata formMetadata);

        FormMetadata Update(FormMetadata formMetadata); 

        IEnumerable<FormMetadata> Update(IEnumerable<FormMetadata> formMetadatas);

        FormMetadata Get(Expression<Func<FormMetadata, bool>> where = null);

        IEnumerable<FormMetadata> GetAll(Expression<Func<FormMetadata, bool>> where = null);

        void Delete(int id);
    }
}
