import { Component, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonModal, IonButton, IonIcon, IonAvatar, IonItem } from '@ionic/angular/standalone';
import { Network } from '@capacitor/network';
import { addIcons } from 'ionicons';
import { filter, cloudyNight, call, chevronBack } from 'ionicons/icons';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { NgFor, NgIf } from '@angular/common';
import { SpeedTestModule } from 'ng-speed-test';
import {SpeedTestService} from 'ng-speed-test';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonItem, IonAvatar, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent,IonModal,IonButton, HttpClientModule, NgFor, NgIf, SpeedTestModule],
})
export class HomePage implements OnInit{
  @ViewChild('noInternet') noNet!: IonModal;
  image!: string
  txt!: string
  apiKey= '750a2e0d554044e8a524af633622cc22'
  weather: any[] = [];
  sunset: any;
  today: any
  urgenceN = num
  speed: any
  constructor(private http: HttpClient , private speedTestService:SpeedTestService) {
    addIcons({
      filter,
      'cloud': cloudyNight,
      call,
      chevronBack,
      'sunset': '../../assets/sunset.svg',
      'humide': '../../assets/humidity.svg',
      'wind': '../../assets/wind.svg',
    })
    this.cheickNetwork()
    // this.checkSpeed()
   }




  ngOnInit(): void {
    this.cheickNetwork()
    this.printCurrentPosition()
    // this.checkSpeed()
    this.test()

  }

  test(){
      this.speedTestService.getMbps().subscribe(
        (speed) => {
          let numSpeed = speed;
          this.speed = numSpeed.toFixed(2)

          setTimeout(() => {
            this.test()
          }, 1000);
        }
      );

  }


   async printCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    let fr_ = 'fr'
    this.http.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}&appid=${this.apiKey}&lang=${fr_}`).subscribe((res : any) =>{
      this.weather = res.daily
      this.sunset = this.getSunsetTime(this.weather[0].sunset)
      let date_ = new Date((this.weather[0].dt * 1000))
      this.today = format(new Date(date_), 'EEEE d MMMM yyyy', { locale: fr });

      this.weather.forEach((element: any) => {
        let date = new Date((element.dt * 1000))
        element.dt = format(new Date(date), 'eee', { locale: fr });

      });

    })
  };

  getSunsetTime(timestamp: any) {
    const sunsetTimestamp = timestamp;
    const sunsetTime = new Date(sunsetTimestamp * 1000); // Convertir le timestamp en millisecondes
    const hours = sunsetTime.getHours().toString().padStart(2, "0"); // Formatage avec 2 chiffres pour les heures
    const minutes = sunsetTime.getMinutes().toString().padStart(2, "0"); // Formatage avec 2 chiffres pour les minutes
    return `${hours}:${minutes}`; // Retourner l'heure du coucher du soleil sous forme HH:MM
}

  async cheickNetwork(){
    let statut= await  Network.getStatus()
     if (statut.connected) {
      this.image= '../../assets/terre2.png'
      this.txt='Vous etes connecté a internet'
    } else {
      this.image= '../../assets/terre.png'
      this.txt='Oops pas de connexion internet'
      // this.noNet.isOpen = true;
    }

    Network.addListener('networkStatusChange', status => {
      if (status.connected) {
        this.image= '../../assets/terre2.png'
        this.txt='Vous etes connecté a internet'
        setTimeout(() => {
          this.noNet.isOpen = false;
        }, 1500);
      } else {
        this.image= '../../assets/terre.png'
        this.txt='Oops pas de connexion internet'
        this.noNet.isOpen = true;
      }
    });
  }

  callClick(num: any){
    window.location.href = "tel:+223"+num;
  }
}

export let num = [
  {
    nom: 'SOMAGEP',
    num1 : '20224030',
    num2 : '20704100'
  },
  {
    nom: 'EDM',
    num1 : '20223020',
    num2 : '20223060'
  },
  {
    nom: 'GENDARMERIE',
    num1 : '80001114',
    num2 : ''
  },
  {
    nom: 'BRIGADES DE MOEURS',
    num1 : '20224405',
    num2 : ''
  },
{
  nom: 'POLICE',
  num1 : '80001115',
  num2 : '20205829'
},
{
  nom: 'POMPIER',
  num1 : '80001201',
  num2 : '20223908'
},
{
  nom: 'GARDE NATIONALE',
  num1 : '80001125',
  num2 : ''
},
{
  nom: 'HOPITAAL GABRIEL TOURE',
  num1 : '20222721',
  num2 : '20239986'
},
{
  nom: 'CHU POINT G',
  num1 : '20225002',
  num2 : ''
},
{
  nom: 'HOPITAL DU MALI',
  num1 : '20727600',
  num2 : '20727569'
},
{
  nom: 'HOPITAL LUXEMBOURG',
  num1 : '80001201',
  num2 : '20223908'
},
{
  nom: 'BUREAU DU VERIFICATEUR GENERAL',
  num1 : '20297025',
  num2 : ''
},
{
  nom: 'AIR SENEGAL',
  num1 : '20230657',
  num2 : ''
},
{
  nom: 'TURKISH AIRLINES',
  num1 : '44979733',
  num2 : ''
},
]
