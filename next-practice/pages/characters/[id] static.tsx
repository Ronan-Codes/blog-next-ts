import { GetCharacterResults, Character } from '../../types';
import Image from 'next/image'
import imageLoader from '../../imageLoader';

const CharacterPage = ({character}:{
    character: Character
}) => {
	return (
        <div>
            <h1>{character.name}</h1>
            <Image 
            loader={imageLoader}
            unoptimized
            src={character.image}
            alt={character.name}
            width="200px"
            height="200px"
            />
        </div>
    )
};

// By exporting getStaticPaths (Static Site Generation) from a page that uses dynamic routes [id].tsx, 
    // Next.js will statically pre-render all the paths specified by getStaticPaths.
    // getStaticPaths must be used with getStaticProps. You cannot use it with getServerSideProps.
export const getStaticPaths = async () => {
	const res = await fetch('https://rickandmortyapi.com/api/character');
	const { results }: GetCharacterResults = await res.json();

	return {
		paths: results.map((character) => {
			return { params: { id: String(character.id) } };
		}),
        fallback: false
	};
};
// When we build our page, this function is going to basically provide the path for each character with the corresponding "character.id" of each.
// Then we're going to use the output of this fn to render a static page for every single item
export const getStaticProps = async({ params }: {params: { id: string }}) => {
    const res = await fetch(
        `https://rickandmortyapi.com/api/character/${params.id}`
    );
    const character = await res.json()
    return {
        props: {
            character
        }
    }
};
// By exporting the getStaticProps (Static Site Generation) from a page, 
    // Next.js will pre-render this page at build time using the props returned by getStaticProps.

export default CharacterPage;
