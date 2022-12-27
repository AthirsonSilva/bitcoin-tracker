import { Handlers, PageProps } from '$fresh/server.ts'
import { Head } from 'https://deno.land/x/fresh@1.1.2/runtime.ts'
import { Price } from './interfaces.ts'

const url = 'https://api.coindesk.com/v1/bpi/currentprice.json'

export const handler: Handlers<Price | null> = {
	async GET(_, ctx) {
		const response = await fetch(url)

		if (response.ok) {
			const price: Price = await response.json()
			return ctx.render(price)
		}

		return ctx.render(null)
	}
}

export default function Home({ data }: PageProps<Price | null>) {
	if (!data) {
		return <h1>Data is not available</h1>
	}

	return (
		<>
			<Head>
				<title>Bitcoin price tracker</title>
				<link rel='icon' href='/Bitcoin.png' />
			</Head>

			<div class={'w-screen h-screen bg-gray-900'}>
				<div class='p-8 mx-auto max-w-screen-md bg-gray-900'>
					<img
						src='/Bitcoin.png'
						width={'200px'}
						class='w-32 h-32 mx-auto'
						alt='the fresh logo: a sliced lemon dripping with juice'
					/>
					<p class='my-10 text(center 3xl white)'>
						Bitcoin price tracker
					</p>
					<p class='my-10 text(center 2xl white)'>
						USD: ${data.bpi.USD.rate}
					</p>
					<p class='my-10 text(center 2xl white)'>
						EUR: ${data.bpi.EUR.rate}
					</p>
					<p class='my-10 text(center 2xl white)'>
						GBP: ${data.bpi.GBP.rate}
					</p>
					<p class='my-10 text(center md white)'>
						Last updated: ${data.time.updated}
					</p>
				</div>
			</div>
		</>
	)
}
