describe('data', () => {
  it('deberia exponer una funcion global filterPlace ', () => {
    assert.isFunction(filterPlace);
  });
  it('deberia exponer una funcion global filterFood ', () => {
    assert.isFunction(filterFood);
  });
  describe('filterPlace(place,search)', () => {
    const place = fixtures.places;
    it('deberia retornar un arreglo solo de restaurantes con distrito de Barranco', () => {
      assert.equal(filterPlace(place,'Barranco')[0].direccion,'Av. Almte. Miguel Grau 340, Barranco 15063');
    });
  });
  describe('filterFood(place,search)', () => {
    const place = fixtures.places;
    it('deberia retornar un arreglo solo de tipo marina en Barranco', () => {
      const process = filterPlace(place,'Barranco');
      assert.equal(filterFood(process,'marina')[0].name,'Amoramar');
    });
  });
});