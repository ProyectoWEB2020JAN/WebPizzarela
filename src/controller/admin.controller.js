const controlador= {};

controlador.inicio = (req, res) =>{
    res.render('index')
}

controlador.menu = (req, res) =>{
    res.render('menu/menu');
}

controlador.nosotros = (req, res) =>{
    res.render('sobreNosotros/sobreNosotros');
}

controlador.sucursales = (req, res) =>{
    res.render('sucursales/sucursales');
}
 
controlador.admin = (req,res) => {
    res.render('./admin');
}

module.exports = controlador;