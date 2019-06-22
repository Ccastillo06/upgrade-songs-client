import { gql } from 'apollo-boost';

// Create a literal graphiql schema
export const getSongsQuery = gql`
  {
    songs {
      id
      name
      genre
    }
  }
`;

export const getAuthorsQuery = gql`
  {
    authors {
      id
      name
      age
      songs {
        id
        name
      }
    }
  }
`;
