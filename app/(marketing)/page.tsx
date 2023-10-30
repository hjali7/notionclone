import {Heading , Footer , Hero} from './_components/index'


export default function MarketingPage () {
    return (
        <div className="flex min-h-full flex-col">
            <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 pb-10 md:justify-start">
                <Heading />
                <Hero />
            </div>
            <Footer />
        </div>
    )
}