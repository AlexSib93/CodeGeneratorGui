using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Newtonsoft.Json;
using DataAccessLayer;
using DataAccessLayer.Dto;

namespace BuisinessLogicLayer.Services
{
    public class FormMetadataService : BaseService, IFormMetadataService
    {
         public IComponentMetadataService ComponentMetadataService { get; set; }

        public FormMetadataService(IUnitOfWork unit, IComponentMetadataService componentMetadataService) : base(unit)
        {
          ComponentMetadataService = componentMetadataService;

        }

        public FormMetadata Add(FormMetadata formMetadata)
        {
            Unit.RepFormMetadata.Add(formMetadata);

            return formMetadata;
        }

        public FormMetadata Update(FormMetadata formMetadata)
        {
              ComponentMetadataService.Update(formMetadata.Components);

            int res = Unit.RepFormMetadata.Update(formMetadata);

            return formMetadata;
        }

        public IEnumerable<FormMetadata> Update(IEnumerable<FormMetadata> formMetadatas)
        {
            foreach(FormMetadata item in formMetadatas)
            {

              ComponentMetadataService.Update(item.Components);
            }

            int res = Unit.RepFormMetadata.Update(formMetadatas);

            return formMetadatas;
        }

        public IEnumerable<FormMetadata> Add(IEnumerable<FormMetadata> formMetadata)
        {
            Unit.RepFormMetadata.Add(formMetadata);

            return formMetadata;
        }

        public FormMetadata Get(Expression<Func<FormMetadata, bool>> where = null)
        {
            FormMetadata t = Unit.RepFormMetadata.Get(where, "Components", "ProjectMetadata", "EditForm", "Model");

            return t;
        }

        public IEnumerable<FormMetadata> GetAll(Expression<Func<FormMetadata, bool>> where = null)
        {
            IEnumerable<FormMetadata> formMetadatas = Unit.RepFormMetadata.GetAll(where,"ProjectMetadata");

            return formMetadatas;
        }

        public void Delete(int id)
        {
            FormMetadata t = Unit.RepFormMetadata.Get(p => p.IdFormMetadata==id);
            Unit.RepFormMetadata.Delete(t);
        }
    }
}
