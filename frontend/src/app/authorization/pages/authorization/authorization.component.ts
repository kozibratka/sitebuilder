import {Component, NgZone, OnInit} from '@angular/core';
import {Event} from '../../../core/services/api/symfony-api/tools/constants/event';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {MatProgressBar} from "@angular/material/progress-bar";
import {HiderElementDirective} from "../../../core/directives/hider-element.directive";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GoogleSigninButtonModule} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-authorization',
  standalone: true,
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    MatProgressBar,
    HiderElementDirective,
    FormsModule,
    GoogleSigninButtonModule,
    ReactiveFormsModule
  ]
})
export class AuthorizationComponent implements OnInit {

  symfonyApiCallEvent = {startSendLogin: Event.PRE_SEND_POST, stopSendLogin: Event.POST_SEND_POST};

  constructor(
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(args => {
      this.initParticle();
    });

    //this.loginLayoutService.initLayout()
  }

  initParticle() {
    (window as any).particlesJS("particles-js", {
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "repulse"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      }
    )
  }

}
