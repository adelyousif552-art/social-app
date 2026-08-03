
import { faAward, faBell, faDownload, faHeart, faImage, faMessage, faPeopleGroup, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from '../../assets/images/y.jpg'
import hero from '../../assets/images/file.jpg'
import { Link } from "react-router";




export default function Authhero({title,description}) {
    const features=[
        {
        icon:faMessage,
        title:'Real-time Chat',
        description:'Instant messaging',
        colors:'bg-teal-700/25 text-teal-300'
    },
     {
        icon:faImage,
        title:'Share Media',
        description:'Photos & videos',
        colors:'bg-blue-700/25 text-blue-300'
    },
     {
        icon:faBell,
        title:'Smart Alerts',
        description:'Stay updated',
        colors:'bg-purple-700/25 text-purple-300'
    },
     {
        icon:faPeopleGroup,
        title:'Communitites',
        description:'Find your tribe',
        colors:'bg-teal-700/25 text-teal-300'
    }
]
const stats=[{
    icon:faPeopleGroup,
    title:'Active users',
    description:'2M+',
    color:'text-cyan-300'
},
{
    icon:faHeart,
    title:'Posts Shared',
    description:'10M+',
    color:"text-pink-300"
},
{
    icon:faMessage,
    title:'Messages Sent',
    description:'50M+',
    color:'text-cyan-300'
}
]

  return<>
  <div className="signuphero hidden lg:flex lg:flex-col lg:justify-between gap-10 p-5 text-white min-h-screen" style={{
    backgroundImage:`linear-gradient(#1447e6cc,#1447e6cc),url(${image})`,
    backgroundRepeat:'no-repeat',
    backgroundSize:'cover',
    backgroundPosition:'center'
  }}>
    <header className="flex items-center space-x-2">
        <Link to={'/'} className="flex items-center gap-2"><span className="size-10 font-bold bg-white/25 rounded-xl text-2xl flex items-center justify-center hover:bg-white/50 transition-colors duration-200">s</span>
        <span className="text-3xl font-bold">SocialHub</span></Link>
    </header>
    <section className="second space-y-5 ">
        <h4 className="font-bold text-5xl">{title.normal}<br/> <span className=" pb-2 bg-linear-to-r from-cyan-300 to-cyan-100 bg-clip-text text-transparent">{title.highlight}</span></h4>
        <p>{title.description}</p>
        <div className="features">
            <ul className="grid lg:grid-cols-2 gap-4">
               {features.map((feature,index)=> <li key={index} className="flex items-center hover:bg-white/50 transition-all duration-200 hover:-translate-y-2 gap-2 bg-white/30 rounded-xl py-2 px-3 ">
                    <div className={`${feature.colors} p-2 rounded-xl  icon`}>
                        <FontAwesomeIcon icon={feature.icon} />
                    </div>
                    <div className="content">
                        <h4>{feature.title}</h4>
                        <span>{feature.description}</span>
                    </div>
                </li>)}
            </ul>
        </div>
        <div className="stats">
            <ul className="flex items-center gap-4">
              {stats.map((stat,index)=>  <li key={index}>
                    <div className="icon space-x-2">
                        <FontAwesomeIcon className={`${stat.color}`} icon={stat.icon} />
                        <span>{stat.description}</span>
                    </div>
                    <p>{stat.title}</p>
                </li>)}
            </ul>
        </div>
        <div>
            <ul className="*:space-x-2 space-y-2 lg:space-y-0 lg:gap-2 lg:flex lg:items-center">
               <li className="  p-1 rounded-full bg-white/25">
                    <FontAwesomeIcon className="text-yellow-300" icon={faDownload} />
                    <span className="">10M+ Downloads</span>
                </li>
                 <li className="p-1 rounded-full bg-white/25">
                    <FontAwesomeIcon className="text-yellow-300" icon={faStar} />
                    <span>4.9<FontAwesomeIcon className="text-white text-xs" icon={faStar}/> App Store</span>
                </li>
                 <li className="p-1 rounded-full bg-white/25">
                    <FontAwesomeIcon className="text-yellow-300" icon={faAward} />
                    <span>Award Winning</span>
                </li>
            </ul>
        </div>
    </section>
    <section className="testomonial bg-white/25 p-5 rounded-xl space-y-4">
        {[...Array(5)].map((_,index)=><FontAwesomeIcon key={index} icon={faStar} className="text-yellow-300"/>)}
        <p>"SocialHub has completely changed how I connect with friends and discover new communities. The experience is seamless!" — Alex Johnson, Product Designer</p>
        <div className="flex items-center gap-2">
            <div>
                <img src={hero} alt="Yousif" className="size-10 rounded-circle" />
            </div>
            <div>
                <h4>Yousif Adel</h4>
                <h4>product designer</h4>
            </div>

        </div>
    </section>
  </div>
  
  </> 
}
