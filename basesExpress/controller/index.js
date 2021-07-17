

const pool=require('../db/db')



const getTiendas = async (request, response) => {


    await pool.query('SELECT  * FROM "AA_Tienda"', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const getColeccionistas = async (request, response) => {


    await pool.query('SELECT * FROM  "AA_Coleccionista"', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getPais = async (request, response) => {


        await pool.query('SELECT * FROM  "AA_Pais"', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}



const getCatalogosPintura= async (request, response) => {
    await pool.query('SELECT * FROM "AA_Catalogo_Pintura" ', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getCatalogosMoneda= async (request, response) => {
    
    await pool.query('SELECT * FROM  "AA_Catalogo_Moneda" inner join "AA_Moneda" on "AA_Catalogo_Moneda".moneda="AA_Moneda".id ', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}




const createArticuloSubasta = async (request, response) => {
    const {id_tienda,id_catalogo}=request.body;






}


const getSubastasTiendas=async (request, response) => {


    
        const tienda_id=request.params.tienda_id;
    
        await pool.query('SELECT * From "AA_Subasta_Evento" inner join "AA_Tienda_Subasta" on "AA_Tienda_Subasta".subasta="AA_Subasta_Evento".id inner join "AA_Tienda" on "AA_Tienda".id= "AA_Tienda_Subasta".tienda', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    
}

const getSubastasTiendasbyID=async (request, response) => {
    
    const tienda_id=request.params.tienda_id;

    await pool.query('SELECT * From "AA_Subasta_Evento" inner join "AA_Tienda_Subasta" on "AA_Tienda_Subasta".subasta="AA_Subasta_Evento".id inner join "AA_Tienda" on "AA_Tienda".id= "AA_Tienda_Subasta".tienda', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })


}





const createSubasta = async (req, res) => {

    const {duracion,costo_inscripcion,costo_cliente,tipo,fecha,pais,tiendas,coleccionistas}=req.body;

    console.log(req.body)
    console.log(duracion)
    console.log(costo_inscripcion)
    console.log(costo_cliente)
    console.log(tipo)
    console.log(fecha)


    const response = await pool.query('INSERT INTO "AA_Subasta_Evento"(fecha, duracion, costo_inscrip, costo_inscrip_cliente, pais_lugar, tipo) VALUES ($1, $2, $3, $4, $5, $6)',[fecha,duracion,costo_inscripcion,costo_cliente,pais,tipo])
    
    for( const id of tiendas){
        console.log(id)
        parseInt(id);
        const response1= await pool.query('INSERT INTO "AA_Tienda_Subasta" (tienda,subasta) values ($1,(SELECT  id as subasta FROM "AA_Subasta_Evento"ORDER BY id DESC limit 1))',[id])
    } 
    for (const coleccionista of coleccionistas){
    const response2= await pool.query('INSERT INTO "AA_Participante"(subasta,coleccionista) values ((SELECT  id as subasta FROM "AA_Subasta_Evento"ORDER BY id DESC limit 1),$1)',[coleccionista])
    }


    if(response.rows){
        return res.json(response.rows);
    }
    else{
        res.error();        
    console.log("error")
    }   

}


const createCostoEnvio = async (request, response) => {

    const date=request.params.fecha;




    await pool.query('INSERT INTO "AA_Costo_Envio"'[date,duracion,costo_inscripcion,costo_inscripcion_cliente,tipo], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}







module.exports={
    createSubasta,
    getColeccionistas,
    getTiendas,
    getPais,
    getSubastasTiendas,
    createCostoEnvio,
    getSubastasTiendasbyID,
    getCatalogosPintura,
    getCatalogosMoneda
}