using System;
using DataAccessLayer.Dto;

namespace DataAccessLayer.Data
{
    public class MockUnit : IUnitOfWork, IDisposable
    {

        private IRepository<ModelMetadata> _repModelMetadata;
        public IRepository<ModelMetadata> RepModelMetadata
        {
            get { return _repModelMetadata ?? (_repModelMetadata = new MockRepository<ModelMetadata>()); }
        }

        private IRepository<ProjectMetadata> _repProjectMetadata;
        public IRepository<ProjectMetadata> RepProjectMetadata
        {
            get { return _repProjectMetadata ?? (_repProjectMetadata = new MockRepository<ProjectMetadata>()); }
        }

        private IRepository<FormMetadata> _repFormMetadata;
        public IRepository<FormMetadata> RepFormMetadata
        {
            get { return _repFormMetadata ?? (_repFormMetadata = new MockRepository<FormMetadata>()); }
        }

        private IRepository<PropMetadata> _repPropMetadata;
        public IRepository<PropMetadata> RepPropMetadata
        {
            get { return _repPropMetadata ?? (_repPropMetadata = new MockRepository<PropMetadata>()); }
        }

        private IRepository<ComponentMetadata> _repComponentMetadata;
        public IRepository<ComponentMetadata> RepComponentMetadata
        {
            get { return _repComponentMetadata ?? (_repComponentMetadata = new MockRepository<ComponentMetadata>()); }
        }

        private IRepository<EnumMetadata> _repEnumMetadata;
        public IRepository<EnumMetadata> RepEnumMetadata
        {
            get { return _repEnumMetadata ?? (_repEnumMetadata = new MockRepository<EnumMetadata>()); }
        }

        private IRepository<EnumValueMetadata> _repEnumValueMetadata;
        public IRepository<EnumValueMetadata> RepEnumValueMetadata
        {
            get { return _repEnumValueMetadata ?? (_repEnumValueMetadata = new MockRepository<EnumValueMetadata>()); }
        }

        private IRepository<User> _repUser;
        public IRepository<User> RepUser
        {
            get { return _repUser ?? (_repUser = new MockRepository<User>()); }
        }


        public void Dispose()
        {
        }
    }
}
