import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import Provider from '../Context/Provider'
import userEvent from '@testing-library/user-event';

describe('Testando o Componente Filter', () => {
  test('Se os imputs de Filtros estão sendo renderizados', () => {
    render(<App />)

    const inputColumn = screen.getByTestId('column-filter');
    const inputComparison = screen.getByTestId('comparison-filter');
    const inputValue = screen.getByTestId('value-filter');
    const btnFilter = screen.getByRole('button', { name: /filtrar/i })

    expect(inputColumn).toBeInTheDocument()
    expect(inputComparison).toBeInTheDocument()
    expect(inputValue).toBeInTheDocument()
    expect(btnFilter).toBeInTheDocument()

  })

  test('Se ao pesquisar planetas com a polução maior que 100000000 resta apenas 4 planetas', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    render(<Provider><App /></Provider>)
   
    const inputColumn = screen.getByTestId('column-filter');
    const inputComparison = screen.getByTestId('comparison-filter');
    const inputValue = screen.getByTestId('value-filter');
    const btnFilter = screen.getByRole('button', { name: /filtrar/i })

    userEvent.selectOptions(
      inputColumn,
      screen.getByRole('option', { name: 'diameter' })
    )
    userEvent.selectOptions(
      inputComparison,
      screen.getByRole('option', { name: 'igual a' })
    )
    userEvent.type(inputValue, '10200');
    userEvent.click(btnFilter)


    waitFor(() => {
      const planets = screen.getAllByTestId('name-planet')
      expect(planets).toHaveLength(10)
    });


  })

  test('Se a comparação "menor que" esta funcionando corretamente ', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    render(<Provider><App /></Provider>)
    
    const inputColumn = screen.getByTestId('column-filter');
    const inputComparison = screen.getByTestId('comparison-filter');
    const inputValue = screen.getByTestId('value-filter');
    const btnFilter = screen.getByRole('button', { name: /filtrar/i })

    userEvent.selectOptions(
      inputColumn,
      screen.getByRole('option', { name: 'diameter' })
    )
    userEvent.selectOptions(
      inputComparison,
      screen.getByRole('option', { name: 'menor que' })
    )
    userEvent.type(inputValue, '10000');
    userEvent.click(btnFilter)
    
    
    waitFor(() => {
      const planets = screen.getAllByTestId('name-planet')
      expect(planets).toBeInTheDocument()
      const EndorPlanet = screen.getByText(/Endor/i)
      const HothPlanet = screen.getByText(/Hoth/i)
      expect(EndorPlanet).toBeInTheDocument()
      expect(HothPlanet).toBeInTheDocument()
    });

  })

  test('Se a comparação "maior que" esta funcionando corretamente ', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    render(<Provider><App /></Provider>)
    
    const inputColumn = screen.getByTestId('column-filter');
    const inputComparison = screen.getByTestId('comparison-filter');
    const inputValue = screen.getByTestId('value-filter');
    const btnFilter = screen.getByRole('button', { name: /filtrar/i })

    userEvent.selectOptions(inputColumn, 'orbital_period');
    userEvent.selectOptions(
      inputComparison,
      screen.getByRole('option', { name: 'maior que' })
    )
    userEvent.type(inputValue, '400');
    userEvent.click(btnFilter)

    waitFor(() => {
      const planets = screen.getAllByTestId('name-planet')
      expect(planets).toHaveLength(3)
    });

  })
})