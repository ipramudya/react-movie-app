import { useEffect, useRef } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { Grid, Spinner, Card } from '../../components';
import useSearch from '../../hooks/useSearch';

const SearchPage = () => {
   // Get query strings
   const useQuery = () => {
      return new URLSearchParams(useLocation().search);
   };
   const query = useQuery().get('query');

   const { foundContent, loading, error, setSearchTerm } = useSearch();
   const initial = useRef(true);

   useEffect(() => {
      if (initial.current) {
         initial.current = false;
         return;
      }
      const delay = setTimeout(() => {
         setSearchTerm(query);
      }, 500);

      return () => clearTimeout(delay);
   }, [setSearchTerm, query]);

   return (
      <>
         {loading && <Spinner loading={loading} />}
         {query.length <= 0 && <Redirect push />}
         {foundContent && (
            <>
               <div style={{ marginBottom: '6%' }} />
               <Grid header={`Results for: ${query}`}>
                  {foundContent?.map((content, idx) => (
                     <Card item={content} key={idx} />
                  ))}
               </Grid>
            </>
         )}
      </>
   );
};

export default SearchPage;