<template>
    <Header></Header>
    <Hero3D></Hero3D>
    <div id="baseline" class="w-full overflow-hidden mt-4 rounded-md box-border  antialiased flex relative flex-col py-80 tracking-tighter hover:underline">
        <h1 class="font-body text-3xl w-1/2 absolute bottom-0 left-0 text-neutral-400"> <span class="text-neutral-100 font-display">Studio 9</span> est une <span class="text-neutral-100">agence de communication</span> basée à <span class="text-neutral-100">Lille</span>. <br> <span class="text-neutral-100">Ensemble</span> vers de <span class="text-neutral-100">nouveaux horizons créatifs</span></h1>
    </div>
    <div class="w-full h-0.5 bg-neutral-300 my-12 opacity-10 overflow-hidden"></div>
    <div class="grid grid-cols-12 gap-4 text-neutral-300 ">
        <div 
        class="
         pb-56
        col-span-4
        text-4xl
        ">
            ( 01 )
        </div>

        <div 
        class="
         col-span-8
         text-5xl
         pr-12
         ">
         Envie de donner vie à votre projet de manière innovante et créative ? <span class="underline">Cliquez ici</span> et nous nous chargerons de tout
        </div>

        <div 
        class="
        col-span-6
        text-2xl
        text-neutral-400
        pb-32
        ">
        ( À propos )
        </div>

        <div
         class="
         col-span-3
         font-body
         text-xl
         text-neutral-400
         text-left
         ">
        Studio 9 est une agence de communication digitale française basée à Lille née en 2023 de l'idée de 3 étudiants en BUT MMI
        </div>

        <div
         class="
         col-span-3
         font-body
         text-xl
         text-neutral-400
         text-left
         ">
        Nous mettons l'accent sur deux valeurs qui nous tiennent à coeur : la créativité et l'innovation
        </div>

        <div 
        class="
        col-span-3
        text-neutral-300
        text-2xl
        pb-56
        ">
        ( Notre histoire )  
        </div>
        
        <div 
        class="
        col-span-9
        ">
        <Timeline/>
        </div>

        <div 
        class="
        pb-24
        col-span-4
        text-4xl
        ">
        ( 02 )
        </div>

        <div 
        class="
        pb-24
        col-span-8
        text-5xl
        text-neutral-300
        flex
        justify-end
        ">
        Explorez nos services : Votre vision, notre créativité, une collaboration innovante pour façonner votre succès numérique
        </div>

        <div class="
        col-span-3
        overflow-hidden
        px-8
        ">
        
        <SiteVitrine3D/>
        <h1 class="text-4xl text-center">Site Vitrine </h1>
        <h2 class="text-lg text-center text-neutral-400 font-body mt-4">Créez une présence en ligne captivante avec un site présentant de manière attrayante les informations clés de votre entreprise.</h2>
        </div>

        <div class="
        col-span-3
        overflow-hidden
        px-8
        ">
        <ECommerce3D/>
        <h1 class="text-4xl text-center">Site E-Commerce</h1>
        <h2 class="text-lg text-center text-neutral-400 font-body mt-4">Établissez une plateforme de vente en ligne sécurisée et conviviale pour promouvoir et vendre vos produits ou services.</h2>
        </div>

        <div class="
        col-span-3
        overflow-hidden
        px-8
        ">
        <DeveloppementWeb3d/>
        <h1 class="text-4xl text-center">Développement Web</h1>
        <h2 class="text-lg text-center text-neutral-400 font-body mt-4">Concevez des solutions web sur mesure pour optimiser la gestion interne, externe et les applications spécifiques.</h2>
        </div>

        <div class="
        col-span-3
        overflow-hidden
        px-8
        ">
        <ApplicationMobile3D/>
        <h1 class="text-4xl text-center">Application Mobile</h1>
        <h2 class="text-lg text-center text-neutral-400 font-body mt-4">Développez des applications mobiles intuitives, offrant une expérience utilisateur optimale sur les appareils iOS et Android.</h2>
        </div>

        <div class="
        col-span-3
        overflow-hidden
        px-8
        ">
        <Referencement3D/>
        <h1 class="text-4xl text-center">Réferencement</h1>
        <h2 class="text-lg text-center text-neutral-400 font-body mt-4">Optimisez votre visibilité sur les moteurs de recherche pour attirer un trafic qualifié vers votre site web et renforcer votre positionnement en ligne.</h2>
        </div>

        <div class="
        col-span-3
        overflow-hidden
        px-8
        ">
        <MarketingDigital3D/>
        <h1 class="text-4xl text-center">Marketing Digital</h1>
        <h2 class="text-lg text-center text-neutral-400 font-body mt-4">Boostez votre visibilité en ligne avec des stratégies marketing efficaces, du référencement payant aux médias sociaux.</h2>
        </div>

        <div class="
        col-span-3
        overflow-hidden
        px-8
        ">
        <IdentiteVisuelle3D/>
        <h1 class="text-4xl text-center">Identité visuelle</h1>
        <h2 class="text-lg text-center text-neutral-400 font-body mt-4">Forgez une identité visuelle distinctive qui reflète la personnalité de votre marque à travers le logo, la typographie et la palette de couleurs.</h2>
        </div>

        <div class="
        col-span-3
        overflow-hidden
        px-8
        ">
        <Print3D/>
        <h1 class="text-4xl text-center">Print</h1>
        <h2 class="text-lg text-center text-neutral-400 font-body mt-4">Créez des supports imprimés percutants tels que brochures, flyers et cartes de visite pour renforcer votre présence physique.</h2>
        </div>

        <div class="
        pt-56
        pb-24
        col-span-4
        text-4xl
        ">
        ( 03 )
        </div>

        <div 
        class="
        pt-56
        pb-24
        col-span-8
        text-5xl
        text-neutral-300
        flex
        justify-end
        ">
        Contactez-nous
        </div>


        <div class="
        pb-24
        col-span-12
        text-4xl
        ">
        <ContactForm/>
        </div>


    
    </div>
<Footer/>
</template>