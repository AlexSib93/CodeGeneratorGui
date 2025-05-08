using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using DataAccessLayer;
using DataAccessLayer.Dto;

namespace BuisinessLogicLayer.Services
{
    public interface IEnumValueMetadataService
    {

        EnumValueMetadata Add(EnumValueMetadata enumValueMetadata);

        EnumValueMetadata Update(EnumValueMetadata enumValueMetadata); 

        IEnumerable<EnumValueMetadata> Update(IEnumerable<EnumValueMetadata> enumValueMetadatas);

        IEnumerable<EnumValueMetadata> Update(int idMaster, IEnumerable<EnumValueMetadata> enumValueMetadatas);

        EnumValueMetadata Get(Expression<Func<EnumValueMetadata, bool>> where = null);

        IEnumerable<EnumValueMetadata> GetAll(Expression<Func<EnumValueMetadata, bool>> where = null);

        IEnumerable<EnumValueMetadata> GetByMaster(int idMaster);


        void Delete(int id);
    }
}
