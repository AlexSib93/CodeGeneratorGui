using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using DataAccessLayer;
using DataAccessLayer.Dto;

namespace BuisinessLogicLayer.Services
{
    public interface IEnumMetadataService
    {

        EnumMetadata Add(EnumMetadata enumMetadata);

        EnumMetadata Update(EnumMetadata enumMetadata); 

        IEnumerable<EnumMetadata> Update(IEnumerable<EnumMetadata> enumMetadatas);

        IEnumerable<EnumMetadata> Update(int idMaster, IEnumerable<EnumMetadata> enumMetadatas);

        EnumMetadata Get(Expression<Func<EnumMetadata, bool>> where = null);

        IEnumerable<EnumMetadata> GetAll(Expression<Func<EnumMetadata, bool>> where = null);

        IEnumerable<EnumMetadata> GetByMaster(int idMaster);


        void Delete(int id);
    }
}
