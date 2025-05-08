using BuisinessLogicLayer.Services;
using DataAccessLayer.Data;
using DataAccessLayer.Dto;

namespace Tests
{

    [TestClass]
    public class EnumMetadataTest
    {
        [TestMethod("Создать и Получить все позиции")]
        public void SetAndGetPositions()
        {
            var service = new EnumMetadataService(new MockUnit());
            service.Add(new EnumMetadata());
            service.Add(new EnumMetadata());
            IEnumerable<EnumMetadata> l = service.Get();
            Assert.IsTrue(l.Any());
        }
    }
}
