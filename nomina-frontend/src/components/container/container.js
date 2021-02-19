import Head from 'next/head'
import Navigation from '../navigation/navigation'
import "bootstrap/dist/css/bootstrap.min.css";

const Container = (props) => (
    <div>
        <Head>
            <title>
                Proyecto AI2
            </title>
       
        </Head>
        <Navigation/>
        <div className="p-4">
            {props.children}
        </div> 
    </div>
)

export default Container;