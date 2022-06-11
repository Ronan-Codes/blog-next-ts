import { GetCharacterResults, Character } from '../../types';
import Image from 'next/image';
import imageLoader from '../../imageLoader';
import { GetServerSideProps } from 'next';

import { useRouter } from 'next/router';

const CharacterPage = ({ character }: { character: Character }) => {
    const router = useRouter();
    console.log(router.query)

	return (
		<div>
			<h1>{character.name}</h1>
			<Image
				loader={imageLoader}
				unoptimized
				src={character.image}
				alt={character.name}
				width='200px'
				height='200px'
			/>
		</div>
	);
};

// GetServerSideProps give typings to context?
export const getServerSideProps: GetServerSideProps = async (context) => {
	const res = await fetch(
		`https://rickandmortyapi.com/api/character/${context.query.id}`
		// changed from ${params.id} from Static Rendering
		// To access this context.query.id in the page, use useRouter
	);
	const character = await res.json();

	console.log(character);
	return {
		props: {
			character,
		},
	};
};

export default CharacterPage;
