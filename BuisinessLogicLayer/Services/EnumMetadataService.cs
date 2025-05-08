using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Newtonsoft.Json;
using DataAccessLayer;
using DataAccessLayer.Dto;
using System.Linq;

namespace BuisinessLogicLayer.Services
{
    public class EnumMetadataService : BaseService, IEnumMetadataService
    {
         public IEnumValueMetadataService EnumValueMetadataService { get; set; }

        public EnumMetadataService(IUnitOfWork unit, IEnumValueMetadataService enumValueMetadataService) : base(unit)
        {
          EnumValueMetadataService = enumValueMetadataService;

        }

        public EnumMetadata Add(EnumMetadata enumMetadata)
        {
            Unit.RepEnumMetadata.Add(enumMetadata);

            return enumMetadata;
        }

        public EnumMetadata Update(EnumMetadata enumMetadata)
        {
              EnumValueMetadataService.Update( enumMetadata.IdEnumMetadata, enumMetadata.Values);
            int res = Unit.RepEnumMetadata.Update(enumMetadata);

            return enumMetadata;
        }

        public IEnumerable<EnumMetadata> Update(IEnumerable<EnumMetadata> enumMetadatas)
        {
            foreach(EnumMetadata item in enumMetadatas)
            {              EnumValueMetadataService.Update( item.Values);

            }

            int res = Unit.RepEnumMetadata.Update(enumMetadatas);

            return enumMetadatas;
        }

        public IEnumerable<EnumMetadata> Update(int idMaster, IEnumerable<EnumMetadata> enumMetadatas)
        {
            IEnumerable<int> existedIds = Unit.RepEnumMetadata.GetIds(i => i.IdProjectMetadata == idMaster, i => i.IdEnumMetadata);
            
            foreach (EnumMetadata item in enumMetadatas)
            {
                if (existedIds.Any(c => c == item.IdEnumMetadata))
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
                if (!enumMetadatas.Any(c => c.IdEnumMetadata == existedId))
                {
                    Delete(existedId);
                }
            }

            return enumMetadatas;
        }

        public IEnumerable<EnumMetadata> Add(IEnumerable<EnumMetadata> enumMetadata)
        {
            Unit.RepEnumMetadata.Add(enumMetadata);

            return enumMetadata;
        }

        public EnumMetadata Get(Expression<Func<EnumMetadata, bool>> where = null)
        {
            EnumMetadata t = Unit.RepEnumMetadata.Get(where, "Values", "ProjectMetadata");

            return t;
        }

        public IEnumerable<EnumMetadata> GetAll(Expression<Func<EnumMetadata, bool>> where = null)
        {
            IEnumerable<EnumMetadata> enumMetadatas = Unit.RepEnumMetadata.GetAll(where,"ProjectMetadata");

            return enumMetadatas;
        }

        public IEnumerable<EnumMetadata> GetByMaster(int idMaster)
        {
            IEnumerable<EnumMetadata> enumMetadatas = Unit.RepEnumMetadata.GetAll( x => x.IdProjectMetadata == idMaster, "ProjectMetadata");

            return enumMetadatas;
        }


        public void Delete(int id)
        {
            EnumMetadata t = Unit.RepEnumMetadata.Get(p => p.IdEnumMetadata==id);
            Unit.RepEnumMetadata.Delete(t);
        }
    }
}
