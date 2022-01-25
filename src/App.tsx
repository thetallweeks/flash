import React, { Suspense } from "react";
import { RecoilRoot } from "recoil";
import { Router, Switch, Route } from "wouter";
import HomeScreen from "./screens/HomeScreen";
import DeckScreen from "./screens/DeckScreen";
import StudyScreen from "./screens/StudyScreen";
import OfflineBanner from "./components/OfflineBanner";
import Header from "./components/Header";

function App() {
  return (
    <Suspense fallback={<div/>}>
      <RecoilRoot>
        <Router base="/flash">
          <OfflineBanner />
          <Header />
          <Switch>
            <Route path="/decks/:id?">
              {(params) => <DeckScreen deckId={params.id ?? ""} />}
            </Route>
            <Route path="/study/:id">
              {(params) => <StudyScreen deckId={params.id ?? ""} />}
            </Route>
            <Route path="/">
              <HomeScreen />
            </Route>
          </Switch>
        </Router>
      </RecoilRoot>
    </Suspense>
  );
}

export default App;
