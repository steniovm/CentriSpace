# CentriSpace
Simulador de Gravidade Centrifuga em Estação Espacial

<canvas id="canvasstation" width="400" height="400">Erro na renderização de elemento canvas</canvas>

<p>Simula a geração de Gravidade artificial em uma estação espacial usando o efeito centrifuga, que ocorrer quando há um movimento rotaciional no ambiente proporciando uma aceleração centripeta sobre os objetos.</p>

<script>
const canvasstation = document.getElementById('canvasstation');
const ctxcanva = canvasstation.getContext("2d");
const imgstation = document.createElement('img');
const imgstationc = document.createElement('img');
const stars = [];
imgstation.src = './spacestation.svg';
imgstationc.src = './spacestationcenter.svg';
let ang = 0;
//estruturas das estrelas
function star(){
    this.x = Math.random()*400;
    this.y = Math.random()*400;
    this.size = Math.random();
    let compred = 205 + Math.random()*50;
    let compgreen = 205 + Math.random()*50;
    let compblue = 205 + Math.random()*50;
    this.color = "rgb("+compred+","+compgreen+","+compblue+")";
}
//cria vetor de estrelas
for(let i=0; i<200; i++){
    stars.push(new star());
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
    const cx = (200);
    const cy = (200);
    ang = ang*Math.PI/180;
    ctxcanva.fillStyle = "#000";
    ctxcanva.fillRect(0,0,400,400);
    plotstars();
    ctxcanva.translate(cx,cy);
    ctxcanva.rotate(ang);
    ctxcanva.translate(-cx,-cy);
    ctxcanva.drawImage(imgstation,5,5,390,390);
    ctxcanva.translate(cx,cy);
    ctxcanva.rotate(-ang);
    ctxcanva.translate(-cx,-cy);
    ctxcanva.drawImage(imgstationc,5,5,390,390);
}
rotation = setInterval(()=>{
        ang = (ang+1)%360;
        plotStation(ang);
    },100);
</script>

<footer>
    <img id="myimg1" src="stenio.jpg" alt="Foto Stenio" height="200"/>
    <img id="myimg2" src="renammagalhaes.jpeg" alt="Foto Renam" height="200"/>
    <div id="divinfo" class="divinfo">
        <span>Autores:</span>
        <span>Stênio Vinicios de Medeiros</span>
        <span>Portifolio: <a href="https://steniovm.github.io/steniovm/"  alt="Meu portifolio de projetos">https://steniovm.github.io/steniovm/</a></span>
        <span>Email: <a href="mailto:steniovm@gmail.com"  alt="Meu email">steniovm@gmail.com</a></span>
        <span>Renam Magalhães</span>
        <span>Linkedin: <a href="https://www.linkedin.com/in/renan-mello-magalh%C3%A3es-b1828951/"  alt="Meu Linkedin">https://www.linkedin.com/in/renan-mello-magalhães-b1828951/</a></span>
    </div>
</footer>
