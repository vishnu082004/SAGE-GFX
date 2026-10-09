import { FiVolume2 } from 'react-icons/fi'

function DragonStage({ onRoar, isRoaring }) {
  return <div className={`dragon-stage ${isRoaring ? 'is-roaring' : ''}`}>
    <svg className="dragon-art" viewBox="0 0 560 310" role="img" aria-label="A glowing dragon breathing a stream of fire toward the service cards">
      <defs>
        <linearGradient id="dragon-scales" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#72e9ea"/><stop offset=".43" stopColor="#3485be"/><stop offset="1" stopColor="#34255f"/></linearGradient>
        <linearGradient id="dragon-fire" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#ff4d95"/><stop offset=".48" stopColor="#ff9950"/><stop offset="1" stopColor="#ffe59a" stopOpacity="0"/></linearGradient>
        <radialGradient id="dragon-glow"><stop stopColor="#fe4ba1" stopOpacity=".45"/><stop offset="1" stopColor="#fe4ba1" stopOpacity="0"/></radialGradient>
      </defs>
      <ellipse cx="263" cy="202" rx="245" ry="98" fill="url(#dragon-glow)"/>
      <path className="dragon-wing" d="M74 220Q73 108 17 69Q91 79 123 128Q142 61 213 31Q182 111 198 155Q250 83 305 89Q268 141 268 192Z" fill="#162c4a" stroke="#5ebfcf" strokeOpacity=".65" strokeWidth="3"/>
      <path d="M77 222Q95 167 163 151Q210 139 265 159L322 190L285 249L204 275L107 270Z" fill="url(#dragon-scales)" stroke="#9cf4eb" strokeOpacity=".55" strokeWidth="3"/>
      <path d="M185 171Q212 104 287 97Q331 92 365 117L420 130Q453 136 472 157L446 178L399 185L370 211L321 208L276 226L224 214Z" fill="url(#dragon-scales)" stroke="#b9fff0" strokeOpacity=".7" strokeWidth="3"/>
      <path d="M249 119Q221 62 190 44Q242 51 277 97M318 104Q313 48 338 17Q352 70 356 109" fill="#25355a" stroke="#7ce1e5" strokeWidth="4" strokeLinejoin="round"/>
      <path d="M369 137Q404 125 443 144L466 159L431 169L387 164Z" fill="#160f27" stroke="#ff8da3" strokeWidth="2"/>
      <path className="dragon-jaw" d="M370 168Q416 176 462 163Q447 199 411 206L374 194Z" fill="#5c294f" stroke="#ff92ae" strokeWidth="2"/>
      <path d="M388 166L398 178L404 168L415 180L421 166L433 176L441 163" fill="#fff3d3"/>
      <path d="M396 194L406 182L414 199L424 180L434 194L443 175" fill="#fff3d3"/>
      <path d="M468 158Q510 149 552 158Q521 168 477 166Z" fill="url(#dragon-fire)" className="dragon-breath"/>
      <path d="M474 161Q505 157 530 160" fill="none" stroke="#fff1b3" strokeWidth="3" strokeLinecap="round" className="dragon-breath-core"/>
      <ellipse cx="355" cy="133" rx="6" ry="8" fill="#ffefb0"/><circle cx="357" cy="134" r="3" fill="#162039"/>
      <path d="M333 143L349 149M315 150L331 157M297 159L313 165M278 170L294 176" stroke="#b7fff0" strokeOpacity=".48" strokeWidth="2"/>
      <path d="M105 244Q153 227 204 245M129 261Q178 244 225 258" fill="none" stroke="#b4f7ee" strokeOpacity=".3" strokeWidth="3"/>
      <circle className="dragon-ember" cx="493" cy="145" r="3" fill="#ffeab1"/><circle className="dragon-ember dragon-ember--two" cx="522" cy="174" r="2" fill="#ff63b2"/>
    </svg>
    <div className="dragon-stage-copy"><span className="dragon-kicker">THE SAGE CREST</span><strong>Ideas, unleashed.</strong><button type="button" className="dragon-roar-button" onClick={onRoar} aria-label="Play the Sage dragon sound effect"><FiVolume2 aria-hidden="true"/> Hear the dragon</button></div>
  </div>
}

export default DragonStage
