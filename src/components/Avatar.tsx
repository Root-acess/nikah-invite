import { starPoints } from './Ornaments';

/**
 * Original flat illustrations of a dulha (sherwani and safa) and a dulhan (dupatta, maang tikka, nath).
 * Both are drawn in a 300 x 400 box so they fit the arch frame.
 */

const GOLD = '#E4B95B';

function Halo() {
  return (
    <>
      <circle cx="150" cy="215" r="138" fill={GOLD} opacity="0.1" />
      <circle cx="150" cy="215" r="108" fill="none" stroke={GOLD} strokeOpacity="0.35" />
    </>
  );
}

function GroomArt() {
  return (
    <svg viewBox="0 0 300 400" aria-hidden="true" focusable="false">
      <Halo />
      {/* neck and sherwani */}
      <rect x="132" y="244" width="36" height="62" rx="10" fill="#B98258" />
      <path d="M24 400C24 336 70 300 150 294C230 300 276 336 276 400Z" fill="#F1E6CC" />
      <path d="M122 292L150 340L178 292Z" fill="#B98258" />
      <path d="M116 294L150 348L184 294L200 300L150 366L100 300Z" fill={GOLD} />
      <path d="M150 366V400" stroke="#C9B27A" strokeWidth="2" />
      <g fill="#B8903A">
        <circle cx="150" cy="378" r="4.5" />
        <circle cx="150" cy="394" r="4.5" />
      </g>
      <g fill={GOLD} opacity="0.85">
        <polygon points={starPoints(8, 9, 4)} transform="translate(82 360)" />
        <polygon points={starPoints(8, 9, 4)} transform="translate(218 360)" />
        <polygon points={starPoints(8, 7, 3)} transform="translate(60 386)" />
        <polygon points={starPoints(8, 7, 3)} transform="translate(240 386)" />
      </g>
      {/* ears and face */}
      <circle cx="99" cy="196" r="10" fill="#C08B5F" />
      <circle cx="201" cy="196" r="10" fill="#C08B5F" />
      <ellipse cx="150" cy="192" rx="50" ry="62" fill="#C99468" />
      {/* trimmed beard and moustache */}
      <path d="M102 205C104 246 126 258 150 258C174 258 196 246 198 205C190 233 170 243 150 243C130 243 110 233 102 205Z" fill="#2A1A14" opacity="0.88" />
      <path d="M122 219Q136 208 150 214Q164 208 178 219Q164 225 150 220Q136 225 122 219Z" fill="#2A1A14" />
      <path d="M134 231Q150 243 166 231" stroke="#7A2A22" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* brows, eyes, nose */}
      <g stroke="#2A1A14" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M117 169Q130 160 143 168" />
        <path d="M157 168Q170 160 183 169" />
      </g>
      <g className="avatar-blink">
        <ellipse cx="130" cy="183" rx="7" ry="4.5" fill="#fff" />
        <ellipse cx="170" cy="183" rx="7" ry="4.5" fill="#fff" />
        <circle cx="130" cy="183" r="3.4" fill="#2A1A14" />
        <circle cx="170" cy="183" r="3.4" fill="#2A1A14" />
      </g>
      <path d="M150 188V203Q144 209 140 207M150 203Q156 209 160 207" stroke="#A8744C" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="116" cy="210" r="9" fill="#D9735F" opacity="0.18" />
      <circle cx="184" cy="210" r="9" fill="#D9735F" opacity="0.18" />
      {/* safa (turban) with kalgi */}
      <path d="M88 160C78 94 116 60 150 60C184 60 222 94 212 160C196 140 104 140 88 160Z" fill="#7A1F2B" />
      <g fill="none" strokeLinecap="round" strokeWidth="6">
        <path d="M94 134C126 110 176 108 207 132" stroke="#A33345" />
        <path d="M90 150C124 124 178 122 210 148" stroke="#5E1420" />
        <path d="M106 110C136 88 170 90 195 110" stroke="#A33345" strokeWidth="5" />
      </g>
      <path className="avatar-plume" d="M150 100C145 72 160 52 174 42C170 62 166 82 157 100Z" fill={GOLD} />
      <ellipse cx="150" cy="110" rx="9" ry="12" fill={GOLD} />
      <circle cx="150" cy="110" r="3.5" fill="#B3243B" />
    </svg>
  );
}

function BrideArt() {
  return (
    <svg viewBox="0 0 300 400" aria-hidden="true" focusable="false">
      <Halo />
      {/* dupatta drape behind, with a gold edge */}
      <path d="M42 400C36 300 52 176 98 112C118 80 182 80 202 112C248 176 264 300 258 400Z" fill="#7A1F2B" />
      <path d="M42 400C36 300 52 176 98 112C118 80 182 80 202 112C248 176 264 300 258 400" fill="none" stroke={GOLD} strokeWidth="3" opacity="0.9" />
      <path d="M92 216C82 108 218 108 208 216Z" fill="#5E1420" />
      {/* neck and outfit */}
      <rect x="134" y="240" width="32" height="64" rx="10" fill="#D2986E" />
      <path d="M30 400C30 338 78 302 150 296C222 302 270 338 270 400Z" fill="#B3243B" />
      <path d="M104 298Q150 350 196 298" stroke={GOLD} strokeWidth="5" fill="none" strokeLinecap="round" />
      <g fill={GOLD} opacity="0.85">
        <polygon points={starPoints(8, 9, 4)} transform="translate(86 362)" />
        <polygon points={starPoints(8, 9, 4)} transform="translate(214 362)" />
        <polygon points={starPoints(8, 7, 3)} transform="translate(150 388)" />
      </g>
      {/* necklace */}
      <path d="M112 296Q150 340 188 296" stroke={GOLD} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M102 290Q150 358 198 290" stroke="#F4EFE3" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeDasharray="0.1 8" />
      <circle cx="150" cy="322" r="8" fill={GOLD} />
      <circle cx="150" cy="322" r="3.4" fill="#B3243B" />
      {/* face and hair */}
      <ellipse cx="150" cy="192" rx="47" ry="60" fill="#DDA67C" />
      <path d="M100 178C102 122 198 122 200 178C186 150 168 140 150 138C132 140 114 150 100 178Z" fill="#1E1412" />
      <circle cx="119" cy="214" r="9" fill="#E07B7B" opacity="0.3" />
      <circle cx="181" cy="214" r="9" fill="#E07B7B" opacity="0.3" />
      {/* brows, kohl-lined eyes, nose with nath, lips */}
      <g stroke="#2A1A14" strokeWidth="3.5" strokeLinecap="round" fill="none">
        <path d="M120 172Q131 163 142 171" />
        <path d="M158 171Q169 163 180 172" />
      </g>
      <g className="avatar-blink">
        <ellipse cx="131" cy="185" rx="7" ry="4.2" fill="#fff" />
        <ellipse cx="169" cy="185" rx="7" ry="4.2" fill="#fff" />
        <circle cx="131" cy="185" r="3.3" fill="#2A1A14" />
        <circle cx="169" cy="185" r="3.3" fill="#2A1A14" />
      </g>
      <g stroke="#1A0F0C" strokeWidth="2.6" strokeLinecap="round" fill="none">
        <path d="M122 184Q131 178 140 184M122 184L118 181" />
        <path d="M160 184Q169 178 178 184M178 184L182 181" />
      </g>
      <path d="M150 192V206Q145 211 141 209M150 206Q155 211 159 209" stroke="#B9835A" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="141" cy="211" r="6" fill="none" stroke={GOLD} strokeWidth="2" />
      <circle cx="141" cy="217" r="2.6" fill="#F4EFE3" />
      <path d="M134 229Q142 223 150 227Q158 223 166 229Q150 243 134 229Z" fill="#B3243B" />
      {/* dupatta rim over the hair, maang tikka, jhumkas */}
      <path d="M92 216C82 108 218 108 208 216" fill="none" stroke={GOLD} strokeWidth="3.5" />
      <path d="M150 134V153" stroke={GOLD} strokeWidth="2" />
      <circle cx="150" cy="159" r="6.5" fill={GOLD} />
      <circle cx="150" cy="159" r="2.6" fill="#B3243B" />
      <g fill={GOLD}>
        <g className="avatar-swing">
          <circle cx="98" cy="226" r="4" />
          <path d="M91 232Q98 256 105 232Z" />
        </g>
        <g className="avatar-swing avatar-swing--b">
          <circle cx="202" cy="226" r="4" />
          <path d="M195 232Q202 256 209 232Z" />
        </g>
      </g>
    </svg>
  );
}

export function Avatar({ kind }: { kind: 'groom' | 'bride' }) {
  return kind === 'groom' ? <GroomArt /> : <BrideArt />;
}
