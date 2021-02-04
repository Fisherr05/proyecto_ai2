import Head from 'next/head'
import Navigation from '../navigation/navigation'

const Container = (props) => (
    <div>
        <Head>
            <title>
                Proyecto AI2
            </title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/cosmo/bootstrap.min.css">
            </link>
        </Head>
        <Navigation>
            <div className="container p-4">

            </div>
        </Navigation>
        {props.children}
    </div>
)

export default Container;