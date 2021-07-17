const { Router}=require ('express');
const router= Router();
const { createSubasta,getColeccionistas, getTiendas, getPais, createCostoEnvio, getSubastasTiendas, getCatalogosPintura, getCatalogosMoneda}=require('../controller/index')

router.get('/Tiendas',getTiendas)
router.post('/crearSubasta',createSubasta)
router.get('/coleccionistas',getColeccionistas)
router.get('/Pais',getPais)
router.post('/crearCostoEnvio',createCostoEnvio)
router.get('/subastas',getSubastasTiendas)
router.get('/catalogoPintura',getCatalogosPintura)
router.get('/catalogoMoneda',getCatalogosMoneda)
module.exports = router;