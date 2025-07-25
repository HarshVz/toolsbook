import './App.css'
import React, {useEffect} from 'react'
import { Home, Error, SignUp, SignIn, Tasks, Category, Loader, Profile, FeaturesPage, Gallary, View, Canvas} from './Pages'
import { Container } from './Components'
import {Routes, Route} from 'react-router-dom'
import {navLinks} from './store/ideas'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useState } from 'react'

function App() {

    const [links, setLinks] = useState([
        { component: Home, path: '/' },
        { component: Tasks, path: '/tasks' },
        { component: Category, path: '/category' },
        { component: SignIn, path: '/login' },
        { component: SignUp, path: '/signup' },
        { component: Profile, path: '/profile' },
        { component: FeaturesPage, path: '/features'},
        { component: Gallary, path: '/gallary'},
        { component: Error, path: '*' },
        { component: View, path: '/tools/:id' },
        { component: Canvas, path: '/canvas' },
    ])

    const [navlink, setNavlinks] = useState([
        { name: 'Home', path: '/' },
        {name: "Gallary", path: '/gallary'},
        { name: 'Profile', path: '/profile' },
        { name: 'Features', path: '/features' },
    ])

    const [globalLinks, setGlobalLinks] = useRecoilState(navLinks)
    useEffect(() => {
        setGlobalLinks(navlink)
    }, [])

  return (
    <>
<Routes>
  {links.map(({ component: Component, path }) => (
    path === '/login' || path === '/signup' ? (
      <Route key={path} path={path} element={<Component />} />
    ) : (
      <Route key={path} path={path} element={<Container><Component /></Container>} />
    )
  ))}
</Routes>

    </>
  )
}

export default App
