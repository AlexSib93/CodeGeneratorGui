using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using DataAccessLayer;
using DataAccessLayer.Dto;

namespace BuisinessLogicLayer.Services
{
    public interface IComponentMetadataService
    {

        ComponentMetadata Add(ComponentMetadata componentMetadata);

        ComponentMetadata Update(ComponentMetadata componentMetadata); 

        IEnumerable<ComponentMetadata> Update(IEnumerable<ComponentMetadata> componentMetadatas);

        ComponentMetadata Get(Expression<Func<ComponentMetadata, bool>> where = null);

        IEnumerable<ComponentMetadata> GetAll(Expression<Func<ComponentMetadata, bool>> where = null);

        void Delete(int id);
    }
}
