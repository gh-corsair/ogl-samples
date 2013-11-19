#version 150 core

uniform sampler2D Diffuse;
uniform bool UseGrad;

in block
{
	vec2 Texcoord;
} In;

out vec4 Color;
/*
vec4 textureFine(in sampler2D Sampler, in vec2 Texcoord)
{
	vec2 Texcoord00 = interpolateAtOffset(Texcoord, vec2(-0.5,-0.5));
	vec2 Texcoord10 = interpolateAtOffset(Texcoord, vec2( 0.5,-0.5));
	vec2 Texcoord11 = interpolateAtOffset(Texcoord, vec2( 0.5, 0.5));
	vec2 Texcoord01 = interpolateAtOffset(Texcoord, vec2(-0.5, 0.5));
	return textureGrad(Sampler, Texcoord, abs(Texcoord10 - Texcoord00), abs(Texcoord01 - Texcoord00));
}

vec4 textureCoarse(in sampler2D Sampler, in vec2 Texcoord)
{
	return texture(Sampler, Texcoord);
}
*/
void main()
{
	if(UseGrad)
	{
		vec2 Texcoord00 = interpolateAtOffset(In.Texcoord, vec2(-0.5,-0.5));
		vec2 Texcoord10 = interpolateAtOffset(In.Texcoord, vec2( 0.5,-0.5));
		vec2 Texcoord11 = interpolateAtOffset(In.Texcoord, vec2( 0.5, 0.5));
		vec2 Texcoord01 = interpolateAtOffset(In.Texcoord, vec2(-0.5, 0.5));
		Color = textureGrad(Diffuse, In.Texcoord, abs(Texcoord10 - Texcoord00), abs(Texcoord01 - Texcoord00));
	//	Color = textureFine(Diffuse, In.Texcoord);
	}
	else
	{
		Color = texture(Diffuse, In.Texcoord);
	//	Color = textureCoarse(Diffuse, In.Texcoord);
	}
}