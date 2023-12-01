//Components

//Common imports
import React, { Component } from "react";
import { connect } from "react-redux";
import pngegg from '../../images/pngegg.png'
//Styles
import './sliderLanding.css';


export class sliderLanding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaused: false,
            prevSlide: 0,
            sliderDb: [["https://image.ondacero.es/clipping/cmsimages02/2023/10/06/D3CE1D9B-5698-4382-8197-B40E3D348759/presidente-ruso-vladimir-putin-imagen-archivo_98.jpg?crop=1080,608,x0,y10&width=1900&height=1069&optimize=high&format=webply", "Putin", `"Gracias por todo FitRevolution..."`, 'https://c0.klipartz.com/pngpicture/186/15/gratis-png-hotel-de-5-estrellas-estrella.png'],
                ['https://media.todojujuy.com/p/58476976e73404cf95859b1f956fc363/adjuntos/227/imagenes/003/240/0003240691/575x324/smart/chaqueno-palavecinojpg.jpg', "Chaqueño Palavecino",`"La recomiendo al 100%, los profes muy buenos y la atencion de 10..."`,'https://c0.klipartz.com/pngpicture/186/15/gratis-png-hotel-de-5-estrellas-estrella.png'],
                ['https://media.ambito.com/p/f898ed44b6c2c94ab03b3a8258341a2e/adjuntos/239/imagenes/040/468/0040468458/mirthajpg.jpg',"Mirtha Legrand",`"Todos deberian entrenar con Fit en una joya, toda mi familia tiene la aplicacion cuando va a entrenar..."`,'https://c0.klipartz.com/pngpicture/186/15/gratis-png-hotel-de-5-estrellas-estrella.png'],
            ]
        }


    }
    nextSlide = () => {
        this.setState({ ...this.state, prevSlide: (this.state.prevSlide + 1) % this.state.sliderDb.length });
    };

    prevSlide = () => {
        this.setState({
           ...this.state, prevSlide: this.state.prevSlide === 0 ? this.state.sliderDb.length - 1 : this.state.prevSlide - 1
        });
    };

    componentDidMount(){
        this.startInterval();
    }
    
    componentWillUnmount() {
        this.stopInterval();
    }

    startInterval = () => {
        this.intervalID = setInterval(() => {
          if (!this.state.isPaused) {
            this.nextSlide();
          }
        }, 4000);
      };

      stopInterval = () => {
        clearInterval(this.intervalID);
      };

      handleNextButtonClick = () => {
       
        this.stopInterval(); // Detener el intervalo
        this.nextSlide()
        this.startInterval()  // reanudar el intervalo
      };

      handlePrevButtonClick = () => {
        
        this.stopInterval(); // Detener el intervalo
        this.prevSlide()
        this.startInterval()  // reanudar el intervalo
      };

    render() {

        return <div className='conteinerSlider'>

            <section class="section">

                <div className="buttons-section">
                    <button className="arrow-prev-item" onClick={this.handlePrevButtonClick}>
                        {"<"}
                    </button>
                    <div className="imgSlider">
                        <img className="imgSlideLanding1" src={this.state.sliderDb[this.state.prevSlide][0]} />
                        <img className="imgSlideLanding2" src={pngegg} />
                    </div>
                    <div className="commentsSLider">
                    <h1>{this.state.sliderDb[this.state.prevSlide][1]}</h1>
                    <p>{this.state.sliderDb[this.state.prevSlide][2]}</p>
                    </div>
                    <button className="arrow-next-item" onClick={this.handleNextButtonClick}>
                        {">"}
                    </button>
                </div>
            </section>

        </div>
    }
}

export const mapStateToProps = (state) => {
    return {

    }
};

export const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(sliderLanding);  //la funcion connect se encarga de que el componente reciba el estado "state", le pasamos las funciones con las que va a trabajar, la funcion connect las ejecut
