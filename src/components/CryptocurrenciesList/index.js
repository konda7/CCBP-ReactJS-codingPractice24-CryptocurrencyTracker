import './index.css'

import {Component} from 'react'
import Loader from 'react-loader-spinner'

import CryptocurrencyItem from '../CryptocurrencyItem'

class CryptocurrenciesList extends Component {
  state = {
    cryptocurrenciesData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getCryptocurrenciesData()
  }

  getCryptocurrenciesData = async () => {
    const response = await fetch(
      'https://apis.ccbp.in/crypto-currency-converter',
    )
    const data = await response.json()
    const modifiedData = data.map(eachItem => ({
      id: eachItem.id,
      currencyName: eachItem.currency_name,
      usdValue: eachItem.usd_value,
      euroValue: eachItem.euro_value,
      currencyLogo: eachItem.currency_logo,
    }))

    this.setState({
      cryptocurrenciesData: modifiedData,
      isLoading: false,
    })
  }

  renderCryptoCurrencyDetails = () => {
    const {cryptocurrenciesData} = this.state

    return (
      <div className="cryptocurrency-tracker-container">
        <h1 className="main-heading">Cryptocurrency Tracker</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/cryptocurrency-bg.png"
          alt="cryptocurrency"
          className="crypto-img"
        />
        <ul className="crypto-list-container">
          <li className="list-heading-container">
            <h1 className="list-headings">Coin Type</h1>
            <div className="values-heading-container">
              <h1 className="list-headings-usd">USD</h1>
              <h1 className="list-headings">EURO</h1>
            </div>
          </li>
          {cryptocurrenciesData.map(eachItem => (
            <CryptocurrencyItem
              key={eachItem.id}
              cryptocurrencyDetails={eachItem}
            />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Rings" color="#ffffff" height={80} width={80} />
          </div>
        ) : (
          this.renderCryptoCurrencyDetails()
        )}
      </div>
    )
  }
}

export default CryptocurrenciesList
