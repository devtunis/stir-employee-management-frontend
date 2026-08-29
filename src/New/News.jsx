import React, { useState } from "react";
import {
  Search,
  Plus,
  Bell,
  Mail,
  ChevronDown,
  ArrowBigUp,
  ArrowBigDown,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Pin,
  Send,
  Image as ImageIcon,
  X,
} from "lucide-react";
 
import "./News.css";
import { useEffect } from "react";
import { use } from "../axiosClient/usehook";
import { useNavigate, useParams } from "react-router-dom";
import Lodaer from "../Component/Lodaer";
import NewLoader from "../Component/NewLoader";

const pictureLinks = [
  "https://www.challenges.tn/wp-content/uploads/2025/01/challenges-tn-North-Africa-Oil-Gas-Forum-2025-main.webp",
  "https://www.repsol.com/content/dam/repsol-corporate/es/sostenibilidad/operarios-refineria-tarragona.jpg.transform/rp-rendition-md/image.jpeg",
  "https://enb.iisd.org/sites/default/files/styles/max_650x650/public/2026-04/Morning%20plenary%20panel%20on%20Just%20Energy%20Transition%20for%20Structural%20Transformation%20and%20Economic%20Diversification_ViennaEnergyForum_10April26.jpg?itok=tLpSus_Y",
  
  "https://www.repsol.com/content/dam/repsol-corporate/es/sostenibilidad/operarios-refineria-tarragona.jpg.transform/rp-rendition-md/image.jpeg",
];

//  const postsData = [
//   {
//     id: 1,
//     category: "Annonce officielle",
//     categoryClass: "official",
//     pinned: true,
//     score: 128,
//     title:
//       "Réunion stratégique du Comité de Direction – Août 2025",
//     description:
//       "Le Comité de Direction s'est réuni pour évaluer les performances et définir les orientations stratégiques pour le dernier trimestre.",
//     author: "Direction Générale",
//     time: "il y a 2 heures",
//     image:
//       "https://www.challenges.tn/wp-content/uploads/2025/01/challenges-tn-North-Africa-Oil-Gas-Forum-2025-main.webp",
//     comments: 24,
//   },

//   {
//     id: 2,
//     category: "Sécurité & HSE",
//     categoryClass: "security",
//     pinned: false,
//     score: 94,
//     title:
//       "STIR renforce ses engagements en matière de sécurité industrielle",
//     description:
//       "De nouvelles mesures ont été mises en place pour renforcer la sécurité sur tous nos sites et garantir le bien-être de nos équipes.",
//     author: "Département HSE",
//     time: "il y a 5 heures",
//     image:
//       "https://www.repsol.com/content/dam/repsol-corporate/es/sostenibilidad/operarios-refineria-tarragona.jpg.transform/rp-rendition-md/image.jpeg",
//     comments: 17,
//   },

//   {
//     id: 3,
//     category: "Événement",
//     categoryClass: "event",
//     pinned: false,
//     score: 76,
//     title:
//       "STIR participe au Forum Énergétique International 2025",
//     description:
//       "STIR participe aux échanges consacrés à l'avenir du secteur énergétique et aux nouvelles perspectives pour l'industrie.",
//     author: "Communication STIR",
//     time: "Hier",
//     image:
//       "https://enb.iisd.org/sites/default/files/styles/max_650x650/public/2026-04/Morning%20plenary%20panel%20on%20Just%20Energy%20Transition%20for%20Structural%20Transformation%20and%20Economic%20Diversification_ViennaEnergyForum_10April26.jpg?itok=tLpSus_Y",
//     comments: 12,
//   },

//   {
//     id: 4,
//     category: "Vie de STIR",
//     categoryClass: "life",
//     pinned: false,
//     score: 61,
//     title:
//       "Journée de l'excellence opérationnelle",
//     description:
//       "Une journée dédiée au travail d'équipe, à l'amélioration continue et au partage des meilleures pratiques opérationnelles.",
//     author: "Ressources Humaines",
//     time: "il y a 1 jour",
//     image:
//       "https://webkpi2prod.azurewebsites.net/App_Data/mediaInformasi/siaran_pers_5khsfjz3.jpg",
//     comments: 8,
//   },

//   {
//     id: 5,
//     category: "Formation",
//     categoryClass: "training",
//     pinned: false,
//     score: 45,
//     title:
//       "Nouvelle session de formation – QHSE",
//     description:
//       "Une nouvelle session de formation dédiée à la sécurité, la qualité et l'environnement sera organisée prochainement.",
//     author: "Centre de Formation STIR",
//     time: "il y a 2 jours",
//     image:
//       "https://www.repsol.com/content/dam/repsol-corporate/es/sostenibilidad/operarios-refineria-tarragona.jpg.transform/rp-rendition-md/image.jpeg",
//     comments: 6,
//   },
// ];

const News = () => {
  const [posts, setPosts] = useState([]);
  const [votes, setVotes] = useState({});
  const [activeFilter, setActiveFilter] = useState("Toutes");
  const [showCreate, setShowCreate] = useState(false);
  const [saved, setSaved] = useState({});
  const  [nameOgrg,setOrg] = useState("stir")
  const [Load,setLoad]  =useState(false)
  const url = useParams()
 
  const [BlogPosts,setBlogPosts] = useState({
    title:'',
    description:'',
    category:'',
    img:''
 
  })

  const [modeImg,setMoadlImg] = useState(false)

 useEffect(()=>{
  const BringPosts = async()=>{
        const {err,data} = await use("/upload/getposts/v1","post",{
        "roomId":url.roomid
      })
      if(err){
        console.log(err)

        return
      }
     
   
      setPosts(data.data.posts.reverse())
      setOrg(data.data.nameorg)
      
  }
  BringPosts()
 },[])











  const filters = [
    "Toutes",
    "Annonces",
    "Événements",
    "Sécurité",
    "Vie de STIR",
    "Formations",
  ];

  const filteredPosts =
    activeFilter === "Toutes"
      ? posts
      : posts.filter((post) => {
          if (activeFilter === "Annonces")
            return post.category === "Annonce officielle";

          if (activeFilter === "Événements")
            return post.category === "Événement";

          if (activeFilter === "Sécurité")
            return post.category === "Sécurité & HSE";

          if (activeFilter === "Vie de STIR")
            return post.category === "Vie de STIR";

          if (activeFilter === "Formations")
            return post.category === "Formation";

          return true;
        });

  const handleVote = (id, type) => {
    setVotes((current) => {
      const previous = current[id];

      if (previous === type) {
        return {
          ...current,
          [id]: null,
        };
      }

      return {
        ...current,
        [id]: type,
      };
    });
  };

  const getScore = (post) => {
    const vote = votes[post.id];
     
      
    if (vote === "up") return post.score + 1;
    if (vote === "down") return post.score - 1;

    return post.score;
  };

  const handleSave = (id) => {
    setSaved((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  const HandelSend = async()=>{

    
    if(BlogPosts.img=="")
    {
      alert("no img")
      return 
    }

    const {err,data} = await use("/upload/post/v1","post",{
        "roomId": url.roomid,
        "nameOrg": nameOgrg,
        "posts_section": [
          {
          
            "category": BlogPosts.category,
            "categoryClass": "official",
            "pinned": false,
            "score": 0,
            "title":BlogPosts.title,
            "description":BlogPosts.description,
            "author": "Owner",
            "time": "il y a 2 heures",
            "image":   BlogPosts.img
        
          }
        ]
      },
      setLoad
        )

   if(err){
     console.log(err)
     setShowCreate(false)
    return
   } setShowCreate(false)
   console.log(data)
   const BringPosts = async()=>{
        const {err,data} = await use("/upload/getposts/v1","post",{
        "roomId":url.roomid
      })
      if(err){
        console.log(err)

        return
      }
      console.log(data.data.posts)
   
      setPosts(data.data.posts.reverse())
      setOrg(data.data.nameorg)
      
  }
  BringPosts()
 
  }
  
  const Nav = useNavigate()

  const getimage = (item)=>{
 
    setBlogPosts({
          ...BlogPosts,
          img:item
        }

    )
    setMoadlImg(false)
  }
  return (

    <> 
     
   {
    Load &&   <div className="wrrraper">
        <NewLoader/>
     </div>
   }

   {
    modeImg && 
    <div className="imgsSelect">
      {
        pictureLinks.map((item,index)=><img key={index} onClick={()=>getimage(item)} src={item} alt=''/>)
      }
    </div>
   }
 <div className="stir-news">

      {/* =========================================
          HEADER
      ========================================= */}

      <header className="stir-news__header">

        <div className="stir-news__brand">

          <div className="stir-news__logo" onClick={()=>Nav("/organizations")}>
            STIR
          </div>

          <div className="stir-news__brand-text">
            <strong>Société Tunisienne des</strong>
            <span>Industries de Raffinage</span>
          </div>

        </div>


        <div className="stir-news__search">

          <Search size={15} />

          <input
            type="text"
            placeholder="Rechercher dans les actualités..."
          />

          <kbd>Ctrl K</kbd>

        </div>


        <div className="stir-news__header-actions">

          <button
            className="stir-news__new-button"
            onClick={() => setShowCreate(true)}
          >
            <Plus size={18} />
          </button>

          <button className="stir-news__icon-button notification">
            <Bell size={17} />
            <span>3</span>
          </button>

          <button className="stir-news__icon-button">
            <Mail size={17} />
          </button>

          <button className="stir-news__account">
            <div className="stir-news__account-avatar">
              MM
            </div>

            <span>Mon compte</span>

            <ChevronDown size={14} />
          </button>

        </div>

      </header>


      {/* =========================================
          MAIN
      ========================================= */}

      <main className="stir-news__main">

        {/* PAGE HEADER */}

        <div className="stir-news__page-header">

          <div>
            <h1>Actualités & Communications</h1>

            <p>
              Suivez les dernières nouvelles, annonces et événements de  {nameOgrg}.
            </p>
          </div>

          <button
            className="stir-news__publish"
            onClick={() => setShowCreate(true)}
          >
            <Send size={15} />
            Publier une actualité
          </button>

        </div>


        {/* =========================================
            FILTERS
        ========================================= */}

        <div className="stir-news__filters">

          <div className="stir-news__filter-list">

            {filters.map((filter) => (
              <button
                key={filter}
                className={
                  activeFilter === filter
                    ? "active"
                    : ""
                }
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}

          </div>


          <div className="stir-news__sort">
            Trier par :
            <strong>Plus récentes</strong>
            <ChevronDown size={14} />
          </div>

        </div>


        {/* =========================================
            FEED
        ========================================= */}

        <section className="stir-news__feed">

          {filteredPosts.map((post) => (

            <article
              className={`stir-post ${
                post.pinned ? "stir-post--pinned" : ""
              }`}
              key={post.id}
            >

              {/* VOTE COLUMN */}

              <div className="stir-post__vote">

                <button
                  className={
                    votes[post.id] === "up"
                      ? "up-active"
                      : ""
                  }
                  onClick={() =>
                    handleVote(post.id, "up")
                  }
                >
                  <ArrowBigUp size={21} />
                </button>

                <strong>
                  {getScore(post)}
                </strong>

                <button
                  className={
                    votes[post.id] === "down"
                      ? "down-active"
                      : ""
                  }
                  onClick={() =>
                    handleVote(post.id, "down")
                  }
                >
                  <ArrowBigDown size={21} />
                </button>

              </div>


              {/* POST CONTENT */}

              <div className="stir-post__body">

                {/* IMAGE */}

                <div className="stir-post__image-wrapper">

                  <img
                    src={post.image}
                    alt={post.title}
                    className="stir-post__image"
                  />

                </div>


                {/* INFORMATION */}

                <div className="stir-post__content">

                  <div className="stir-post__meta">

                    {post.pinned && (
                      <>
                        <span className="stir-post__pinned">
                          <Pin size={11} />
                          ÉPINGLÉ
                        </span>

                        <span className="stir-post__dot">
                          •
                        </span>
                      </>
                    )}

                    <span
                      className={`stir-post__category ${post.categoryClass}`}
                    >
                      {post.category}
                    </span>

                  </div>


                  <h2>
                    {post.title}
                  </h2>

                  <p>
                    {post.description}
                  </p>


                  {/* AUTHOR */}

                  <div className="stir-post__author">

                    <div className="stir-post__avatar">
                      STIR
                    </div>

                    <span>
                      {post.author}
                    </span>

                    <i>•</i>

                    <span>
                      {post.Time.substr(0,post.Time.indexOf("T")  )}
                    </span>

                  </div>

                </div>

              </div>


              {/* ACTIONS */}

              <div className="stir-post__actions">

                <button>
                  <MessageCircle size={16} />
                  <span>{post.comments} commentaires</span>
                </button>

                <button>
                  <Share2 size={16} />
                  <span>Partager</span>
                </button>

                <button
                  className={
                    saved[post.id]
                      ? "saved"
                      : ""
                  }
                  onClick={() =>
                    handleSave(post.id)
                  }
                >
                  <Bookmark size={16} />
                  <span>
                    {saved[post.id]
                      ? "Enregistré"
                      : "Enregistrer"}
                  </span>
                </button>

                <button className="stir-post__more">
                  <MoreHorizontal size={18} />
                </button>

              </div>

            </article>

          ))}
 

  {
    filteredPosts.length==0 && <h1>No posts</h1>
  }
        </section>

      </main>


      {/* =========================================
          CREATE POST MODAL
      ========================================= */}

      {showCreate && (

        <div
          className="stir-modal"
          onClick={() => setShowCreate(false)}
        >

          <div
            className="stir-modal__box"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="stir-modal__header">

              <div>
                <span>STIR</span>
                <h2>Nouvelle actualité</h2>
              </div>

              <button
                onClick={() => setShowCreate(false)}
              >
                <X size={18} />
              </button>

            </div>


            <input
              type="text"
              placeholder="Titre de votre actualité..."
              onChange={(e)=>setBlogPosts({
                ...BlogPosts , 
                 title:e.target.value
              })}
            />
            <br/>  <br/>
              
            <input
              type="text"
              placeholder="description..."
              onChange={(e)=>setBlogPosts({
                ...BlogPosts , 
                 description:e.target.value
              })}
            />

             

            <div className="stir-modal__options">

              <button onClick={()=>setMoadlImg(true)}>
                <ImageIcon size={17} />
                Ajouter une image
              </button>

              <select onChange={(e)=>setBlogPosts({
                ...BlogPosts , 
                 category:e.target.value
              })}>
                <option disabled value="">choisir catégories</option>
                <option >Catégorie</option>
                <option>Annonce officielle</option>
                <option>Événement</option>
                <option>Sécurité & HSE</option>
                <option>Vie de STIR</option>
                <option>Formation</option>
              </select>

            </div>


            <button
              className="stir-modal__publish"
              // onClick={() => setShowCreate(false)}
              onClick={()=>HandelSend()}
            >
              <Send size={15} />
              Publier l'actualité
            </button>

          </div>

        </div>

      )}

    </div>
      </>    
   
  );
};

export default News;