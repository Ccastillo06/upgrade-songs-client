import { gql } from 'apollo-boost';

export const addSongMutation = gql`
  mutation($name: String!, $genre: String!, $year: Int!, $authorId: ID!) {
    addSong(name: $name, genre: $genre, year: $year, authorId: $authorId) {
      id
      name
    }
  }
`;
