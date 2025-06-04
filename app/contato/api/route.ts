import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Dados recebidos:', data); 

    if (!data.nome || !data.email || !data.mensagem) {
      return NextResponse.json(
        { error: 'Preencha todos os campos' },
        { status: 400 }
      );
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(
      { success: true, message: 'Mensagem enviada!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro na API:', error);
    return NextResponse.json(
      { error: 'Erro interno no servidor' },
      { status: 500 }
    );
  }
}