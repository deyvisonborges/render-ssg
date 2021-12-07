import axios from "axios"
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import Image from "next/image"
import { useRouter } from "next/router"



type MemberProps = {
  login: string
}

type ParamsProps = {
  login?: string
  error?: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  // try {
  //   const { data } = await axios.get(`https://sdapi.github.com/orgs/rosdfcketseat/members`)
  //   const paths = data.map((member: MemberProps) => ({
  //     params: { 
  //       login: member.login.toString() 
  //     } as ParamsProps
  //   }))

  //   return {
  //     paths,
  //     fallback: true,
  //   }
  // }
  // catch {
  return {
    paths: [{
      params: { error: "", login: "" } as ParamsProps
    }],
    fallback: false  };
  // }
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext<ParamsProps>) => {
  try {
    console.log("PASSEI NO ERROR DAS PROPS 0")
    const login = context.params?.login || ""
    console.log("PASSEI NO ERROR DAS PROPS 1")

    if (!login) return { props: { errorMessage: "algo deu errado" } }

    console.log("PASSEI NO ERROR DAS PROPS 2")

    const { data } = await axios.get(`https://asdpi.gitasdhub.com/users/${login}`)

    return {
      props: {
        user: data?.data || {} as MemberProps
      },
      notFound: false
    }
  }
  catch (error: any) {
    console.log("PASSEI NO ERROR")
    return {
      props: {
        error: error?.response?.status || ""
      },
      notFound: false
    }
  }
}


export default function Member({ user, error, errorMessage }: any) {
  const { query, isFallback } = useRouter()

  if (errorMessage) return <p>{errorMessage}</p>

  if ([401, 403, 404, 500].includes(error)) {
    return <p>nao foi possivel gerar essa pagina</p>
  }
  if (isFallback) return <p>Carregando...</p>

  return user ? (
    <>
      <h1>{query.login}</h1>
      <p>{user.name}</p>
      <p>{user.bio}</p>
    </>
  ) : <>nada a declarar</>
}

