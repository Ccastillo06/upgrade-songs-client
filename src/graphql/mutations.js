import { gql } from 'apollo-boost';

export const addSongMutation = gql`
  mutation($name: String!, $genre: String!, $year: Int!, $authorId: ID!) {
    addSong(name: $name, genre: $genre, year: $year, authorId: $authorId) {
      id
      name
    }
  }
`;

export const deleteSongMutation = gql`
  mutation($id: ID!) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export const addAuthorMutation = gql`
  mutation($name: String!, $age: Int!) {
    addAuthor(name: $name, age: $age) {
      id
      name
    }
  }
`;
