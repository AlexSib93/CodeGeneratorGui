using BuisinessLogicLayer.Services;
using DataAccessLayer.Data;
using DataAccessLayer.Dto;

namespace Tests
{

    [TestClass]
    public class ComponentMetadataTest
    {
        [TestMethod("Создать и Получить все позиции")]
        public void SetAndGetPositions()
        {
            var service = new ComponentMetadataService(new MockUnit());
            service.Add(new ComponentMetadata());
            service.Add(new ComponentMetadata());
            IEnumerable<ComponentMetadata> l = service.Get();
            Assert.IsTrue(l.Any());
        }
    }
}
