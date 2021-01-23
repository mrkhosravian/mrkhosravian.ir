import * as React from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import SpotifyEmbeddedCode from "../../components/SpotifyEmbeddedCode"

export default function IndexPage({ data }) {
  return (
    <Layout>
      <SEO title="Favorite music" />
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-5 justify-items-center">

        <SpotifyEmbeddedCode src={"https://open.spotify.com/embed/track/5KcURdZgTUG44siqUFrqrO"} />
        <SpotifyEmbeddedCode src={"https://open.spotify.com/embed/track/6AeJ1NHPJl41MlQO9mBRMe"} />
        <SpotifyEmbeddedCode src={"https://open.spotify.com/embed/track/6CfbbEhPbEW7f1oMxfVYpm"} />
        <SpotifyEmbeddedCode src={"https://open.spotify.com/embed/track/48qYnZEEv9TjwhU8u1ZPBf"} />
        <SpotifyEmbeddedCode src={"https://open.spotify.com/embed/track/0UMLejbZXf7YVgnfxURvVr"} />

      </div>
    </Layout>
  )
}
