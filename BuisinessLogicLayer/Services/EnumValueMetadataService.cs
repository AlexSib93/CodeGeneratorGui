using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Newtonsoft.Json;
using DataAccessLayer;
using DataAccessLayer.Dto;
using System.Linq;

namespace BuisinessLogicLayer.Services
{
    public class EnumValueMetadataService : BaseService, IEnumValueMetadataService
    {


        public EnumValueMetadataService(IUnitOfWork unit) : base(unit)
        {


        }

        public EnumValueMetadata Add(EnumValueMetadata enumValueMetadata)
        {
            Unit.RepEnumValueMetadata.Add(enumValueMetadata);

            return enumValueMetadata;
        }

        public EnumValueMetadata Update(EnumValueMetadata enumValueMetadata)
        {

            int res = Unit.RepEnumValueMetadata.Update(enumValueMetadata);

            return enumValueMetadata;
        }

        public IEnumerable<EnumValueMetadata> Update(IEnumerable<EnumValueMetadata> enumValueMetadatas)
        {
            foreach(EnumValueMetadata item in enumValueMetadatas)
            {

            }

            int res = Unit.RepEnumValueMetadata.Update(enumValueMetadatas);

            return enumValueMetadatas;
        }

        public IEnumerable<EnumValueMetadata> Update(int idMaster, IEnumerable<EnumValueMetadata> enumValueMetadatas)
        {
            IEnumerable<int> existedIds = Unit.RepEnumValueMetadata.GetIds(i => i.IdEnumMetadata == idMaster, i => i.IdEnumValueMetadata);
            
            foreach (EnumValueMetadata item in enumValueMetadatas)
            {
                if (existedIds.Any(c => c == item.IdEnumValueMetadata))
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
                if (!enumValueMetadatas.Any(c => c.IdEnumValueMetadata == existedId))
                {
                    Delete(existedId);
                }
            }

            return enumValueMetadatas;
        }

        public IEnumerable<EnumValueMetadata> Add(IEnumerable<EnumValueMetadata> enumValueMetadata)
        {
            Unit.RepEnumValueMetadata.Add(enumValueMetadata);

            return enumValueMetadata;
        }

        public EnumValueMetadata Get(Expression<Func<EnumValueMetadata, bool>> where = null)
        {
            EnumValueMetadata t = Unit.RepEnumValueMetadata.Get(where, "EnumMetadata");

            return t;
        }

        public IEnumerable<EnumValueMetadata> GetAll(Expression<Func<EnumValueMetadata, bool>> where = null)
        {
            IEnumerable<EnumValueMetadata> enumValueMetadatas = Unit.RepEnumValueMetadata.GetAll(where,"EnumMetadata");

            return enumValueMetadatas;
        }

        public IEnumerable<EnumValueMetadata> GetByMaster(int idMaster)
        {
            IEnumerable<EnumValueMetadata> enumValueMetadatas = Unit.RepEnumValueMetadata.GetAll( x => x.IdEnumMetadata == idMaster, "EnumMetadata");

            return enumValueMetadatas;
        }


        public void Delete(int id)
        {
            EnumValueMetadata t = Unit.RepEnumValueMetadata.Get(p => p.IdEnumValueMetadata==id);
            Unit.RepEnumValueMetadata.Delete(t);
        }
    }
}
