import styles from '../../styles/Feed.module.css'
import { useRouter } from 'next/router';
import axios from 'axios'

const Feed = ({ pageNumber, articles }) => {

  const router = useRouter();

  return (
    <div className='page-container'>
      <div className={styles.main}> 
            {articles.map((article, index) => (
              <div key={index} className={styles.post}>
                <h1 onClick={() => (window.location.href = article.url)}>{article.title}</h1>
                <p>{article.description}</p>
                {!!article.urlToImage && <img src={article.urlToImage} />}
              </div>
            ))};
        </div>

        <div className={styles.paginator}>
          <div 
            onClick={() => {
              if (pageNumber > 1) {
                router.push(`/feed/${pageNumber + 1}`).then(() => window.scrollTo(0,0));
              }
            }}
            className={pageNumber === 5 ? styles.disabled : styles.active}>
              Previous Page
          </div>

          <div>#{pageNumber}</div>
        </div>
    </div>
  );
}

export const getServerSideProps = async pageContext => {
  const pageNumber = pageContext.query.slug;

  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      }
    }
  }

  const {data} = await axios(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
      },
    },
  )

  return {
    props: {
      articles: data.articles,
      pageNumber: +pageNumber,
    }
  }
};

export default Feed;

// http://localhost:3000/feed/10
// pageContext:

// {
//   ...
//   query: { slug: '10' },
//   resolvedUrl: '/feed/10',
//   params: { slug: '10' },
//   locales: undefined,
//   locale: undefined,
//   defaultLocale: undefined
// }