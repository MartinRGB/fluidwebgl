precision highp float;
uniform sampler2D velocity;
uniform sampler2D pressure;
varying vec2 uv;

void main(){
    // gl_FragColor = vec4(
    //     (texture2D(pressure, uv)).x,
    //     (texture2D(velocity, uv)*1.5+0.5).xy,
    // 1.0);
    vec4 fourthColor = vec4(1.0,1.0,1.0,1.0);
    vec4 thirdColor = vec4(0.25,0.5,1,1.0);
    vec4 secondColor = vec4(0.0,0.0,0.5,1.0);
    vec4 firstColor = vec4(0.0,0.0,0.0,0.0);
    
    float velFac = (texture2D(velocity, uv)*1.5).x;

    float h = 0.333;
    vec4 col1 = mix(mix(firstColor, secondColor, velFac/h), mix(secondColor, thirdColor, (velFac - h)/(1.0 - h*2.0)), step(h, velFac));  
    vec4 col2 = mix(mix(secondColor, thirdColor, (velFac - h)/(1.0 - h*2.0)), mix(thirdColor, fourthColor, (velFac - h*2.0)/(1.0-h*2.0)), step(h*2.0, velFac));
    vec4 col = mix(col1,col2,step(h*2.0,velFac));

    float pressureFac = texture2D(pressure, uv).y;
    pressureFac = smoothstep(0.,1.,pressureFac);

    gl_FragColor = vec4(
        vec3(col.x*pressureFac,col.y,col.z),
    1.0);
}
