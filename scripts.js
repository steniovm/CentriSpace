const canvasstation = document.getElementById('canvasstation');
const ctxcanva = canvasstation.getContext("2d");
const startcond = document.getElementById('startcond');
const pausecond = document.getElementById('pausecond');
const inraio = document.getElementById('inraio');
const inrot = document.getElementById('inrot');
const rpmtohz = document.getElementById('rpmtohz');
const output = document.getElementById('output');
const imgstation = document.createElement('img');
const imgstationc = document.createElement('img');
const maxWidth = canvasstation.width;
const maxHeight = canvasstation.height;
const gterra = 9.80665;
const numberstarts = 200;
const stars = [];
let dtime = 100;
imgstation.src = './spacestation.svg';
imgstationc.src = './spacestationcenter.svg';
let raio = parseInt(inraio.value);
let velocidadeAngular = parseFloat(inrot.value);
let aceleracaoCentripeta = Math.pow(velocidadeAngular, 2) * raio;
let gravidade = calcularGravidadeArtificial(raio, velocidadeAngular);
let ang = 0;
let rotation = 0;
//estruturas das estrelas
function star(){
    this.x = Math.random()*maxWidth;
    this.y = Math.random()*maxHeight;
    this.size = Math.random();
    let compred = 205 + Math.random()*50;
    let compgreen = 205 + Math.random()*50;
    let compblue = 205 + Math.random()*50;
    this.color = "rgb("+compred+","+compgreen+","+compblue+")";
}
//cria vetor de estrelas
for(let i=0; i<numberstarts; i++){
    stars.push(new star())
}
//plota estrelas em elemento canva
function plotstars(){
    stars.forEach(st=>{
        ctxcanva.beginPath();
        ctxcanva.arc(st.x, st.y, st.size, 0, 2*Math.PI);
        ctxcanva.fillStyle = st.color;
        ctxcanva.fill();
    });
}
function plotStation(ang=0){
    const cx = (maxWidth/2);
    const cy = (maxHeight/2);
    ang = ang*Math.PI/180;
    ctxcanva.fillStyle = "#000";
    ctxcanva.fillRect(0,0,maxWidth,maxHeight);
    plotstars();
    ctxcanva.translate(cx,cy);
    ctxcanva.rotate(ang);
    ctxcanva.translate(-cx,-cy);
    ctxcanva.drawImage(imgstation,5,5,maxHeight-10, maxHeight-10);
    ctxcanva.translate(cx,cy);
    ctxcanva.rotate(-ang);
    ctxcanva.translate(-cx,-cy);
    ctxcanva.drawImage(imgstationc,5,5,maxHeight-10, maxHeight-10);
}
setTimeout(plotStation,100);

function calcularGravidadeArtificial(raio, velocidadeAngular) {
    // Converter a velocidade angular de RPM (rotações por minuto) para radianos por segundo
    velocidadeAngular = (velocidadeAngular * 2 * Math.PI) / 60;
    // Calcular a aceleração centrípeta
    aceleracaoCentripeta = Math.pow(velocidadeAngular, 2) * raio;
    // Calcular a gravidade artificial
    var gravidadeArtificial = aceleracaoCentripeta / gterra;
    return gravidadeArtificial;
}

inraio.addEventListener('change',()=>{
    raio = parseInt(inraio.value);
    gravidade = calcularGravidadeArtificial(raio, velocidadeAngular);
    output.innerHTML = "a = "+aceleracaoCentripeta.toFixed(2)+" m/s² = "+gravidade.toFixed(2)+" g";
});
inrot.addEventListener('change',()=>{
    velocidadeAngular = parseFloat(inrot.value);
    gravidade = calcularGravidadeArtificial(raio, velocidadeAngular);
    rpmtohz.innerHTML="= "+(velocidadeAngular/60).toFixed(2)+" Hz";
    output.innerHTML = "a = "+aceleracaoCentripeta.toFixed(2)+" m/s² = "+gravidade.toFixed(2)+" g";
    dtime = 1/(velocidadeAngular*6);
});
startcond.addEventListener('click',()=>{
    dtime = 0.06/velocidadeAngular;
    clearInterval(rotation);
    rotation = setInterval(()=>{
        ang = (ang+1)%360;
        plotStation(ang);
        console.log(dtime);
    },dtime);
});
pausecond.addEventListener('click',()=>{
    clearInterval(rotation);
    rotation = 0;
});
