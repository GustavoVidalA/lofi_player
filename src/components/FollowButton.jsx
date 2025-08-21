// src/components/FollowButton.jsx
import { useState } from 'react'

function FollowButton() {
  const [following, setFollowing] = useState(false)

  return (
    <button
      onClick={() => setFollowing(!following)}
      className={`px-4 py-2 border rounded transition ${
        following
          ? 'bg-white text-black border-white'
          : 'border-white text-white hover:bg-white hover:text-black'
      }`}
    >
      {following ? 'Following' : 'Follow'}
    </button>
  )
}

export default FollowButton
