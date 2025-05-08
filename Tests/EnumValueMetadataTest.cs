using BuisinessLogicLayer.Services;
using DataAccessLayer.Data;
using DataAccessLayer.Dto;

namespace Tests
{

    [TestClass]
    public class EnumValueMetadataTest
    {
        [TestMethod("Создать и Получить все позиции")]
        public void SetAndGetPositions()
        {
            var service = new EnumValueMetadataService(new MockUnit());
            service.Add(new EnumValueMetadata());
            service.Add(new EnumValueMetadata());
            IEnumerable<EnumValueMetadata> l = service.Get();
            Assert.IsTrue(l.Any());
        }
    }
}
