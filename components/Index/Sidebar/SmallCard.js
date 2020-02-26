const SmallCard = ({ entity, triggerDetailModal }) => {

    function sectionNameFromId(sectionId) {
        switch(sectionId) {
            case '1':
                return 'Newsletter';
            case '2':
                return 'Podcast';
            case '3':
                return 'Blog';
        }
        return;
    }

    return (<>
        <div className='Container' onClick={() => triggerDetailModal(entity)}>
            <div className='Image'></div>
            <div className='DetailsContainer'>
                <h4 className='TypeLabel'>{sectionNameFromId(entity.sectionId)}</h4>
                <h3 className='Title'>{entity.title}</h3>
                { entity.description.length > 120 ?
                <p className='CardDescription'>{entity.description.slice(0,120)}...</p>
                : 
                <p className='CardDescription'>{entity.description}</p> }
            </div>
        </div>

        <style jsx>{`
        .Container {
            border: 1px solid #ccc;
            border-radius: 8px;
            overflow: hidden;
            cursor: pointer;
            transition: all .2s;
        }
        .Container:hover {
            border: 1px solid #3daeac;
            transform: translate3d(0, -2px, 0);
            box-shadow: 0 2px 6px rgba(0,0,0,.12);
        }
        .Image {
            height: 80px;
            background-image: url('${entity.imageUrl}');
            background-position: center;
            background-size: cover;
            border-bottom: 1px solid #ccc;
            transition: all .2s;
        }
        .Container:hover .Image {
            border-bottom: 1px solid #3daeac;
        } 
        .DetailsContainer {
            padding: 5px;
        }
        .TypeLabel {
            margin: 0;
            text-transform: uppercase;
            font-weight: 100;
            letter-spacing: 1px;
            font-size: .7rem;
            opacity: .9;
        }
        .Title {
            font-size: 1rem;
            font-weight: 600;
            margin: 3px 0 8px 0;
        }
        .Description {
            font-size: .9rem;
        }
        `}</style>
    </>);
}

export default SmallCard;