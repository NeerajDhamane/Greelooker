import plantsImg from '../assets/plants/plants.jpg'


const plants = [
  // OUTER — size 180px
  // object-position targets exact plant using our Python coordinates
  { w:180, pos:{top:'4%',left:'1%'},    op:0.18, anim:'floatA 7s ease-in-out infinite 0s',    objPos:'7.1% 16.7%'  },
  { w:180, pos:{top:'2%',left:'23%'},   op:0.16, anim:'floatC 8s ease-in-out infinite 0.8s',  objPos:'35.6% 16.7%' },
  { w:180, pos:{top:'4%',right:'1%'},   op:0.18, anim:'floatA 6s ease-in-out infinite 0.2s',  objPos:'92.6% 16.7%' },
  { w:180, pos:{top:'2%',right:'23%'},  op:0.16, anim:'floatB 7s ease-in-out infinite 0.4s',  objPos:'78.3% 16.7%' },
  { w:180, pos:{top:'40%',left:'1%'},   op:0.17, anim:'floatB 8s ease-in-out infinite 1s',    objPos:'35.6% 50%'   },
  { w:180, pos:{top:'40%',right:'1%'},  op:0.17, anim:'floatA 9s ease-in-out infinite 1.5s',  objPos:'64.1% 50%'   },
  { w:180, pos:{top:'67%',left:'1%'},   op:0.17, anim:'floatC 6s ease-in-out infinite 2s',    objPos:'7.1% 83.3%'  },
  { w:180, pos:{top:'70%',left:'22%'},  op:0.14, anim:'floatD 7s ease-in-out infinite 0.6s',  objPos:'35.6% 83.3%' },
  { w:180, pos:{top:'70%',right:'22%'}, op:0.14, anim:'floatA 8s ease-in-out infinite 1.2s',  objPos:'64.1% 83.3%' },
  { w:180, pos:{top:'67%',right:'1%'},  op:0.17, anim:'floatB 5s ease-in-out infinite 2.5s',  objPos:'92.6% 83.3%' },

  // BEHIND TEXT — size 120px, low opacity
  { w:120, pos:{top:'22%',left:'34%'},  op:0.07, anim:'floatC 10s ease-in-out infinite 0.3s', objPos:'21.3% 16.7%' },
  { w:120, pos:{top:'38%',left:'46%'},  op:0.06, anim:'floatA 12s ease-in-out infinite 2s',   objPos:'49.9% 50%'   },
  { w:120, pos:{top:'56%',right:'34%'}, op:0.07, anim:'floatB 11s ease-in-out infinite 1.8s', objPos:'78.3% 83.3%' },
]

const FloatingPlants = () => {
  return (
    <>
      {plants.map((p, i) => (
        <div
          key={i}
          className="plant-el"
          style={{
            width: p.w,
            height: p.w,
            opacity: p.op,
            animation: p.anim,
            zIndex: i < 10 ? 2 : 1,
            ...p.pos,
          }}
        >
          <img
            src={plantsImg}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: p.objPos,
              transform: 'scale(3.5)',
              transformOrigin: p.objPos,
            }}
          />
        </div>
      ))}
    </>
  )
}

export default FloatingPlants