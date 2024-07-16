#include <bits/stdc++.h>
using namespace std;

void Print(int board[][9], int n)
{
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
        {
            cout << board[i][j] << " ";
        }
        cout << endl;
    }
    cout << endl;
}

bool isValid(int board[][9], int i, int j, int num, int n)
{

    // check row col
    for (int a = 0; a < n; a++)
    {
        if ((board[i][a] == num) || (board[a][j] == num))
        {
            return false;
        }
    }

    // subMatrix check
    int rn = sqrt(n);
    int si = i - i % rn;
    int sj = j - j % rn;

    for (int a = si; a < si + rn; a++)
    {
        for (int b = sj; b < sj + rn; b++)
        {
            if (board[a][b] == num)
            {
                return false;
            }
        }
    }

    return true;
}

bool SudukoSolver(int board[][9], int i, int j, int n)
{

    // base case
    if (i == n)
    {
        Print(board, n);
        return true;
    }

    // check if you are in  the board or not
    if (j == n)
    {
        return SudukoSolver(board, i + 1, 0, n);
    }

    // check if the cell is alreadyt filled
    if (board[i][j] != 0)
    {
        return SudukoSolver(board, i, j+1, n);
    }

    // filling the board with appropriate number
    for (int num = 1; num <= 9; num++)
    {
        // Check if num canbe filled
        if (isValid(board, i, j, num, n))
        {
            board[i][j] = num;
            bool subAns = SudukoSolver(board, i, j + 1, n);
            if (subAns)
            {
                return true;
            }
            // Backtrackng if doesnt fit
            board[i][j] = 0;
        }
    }
    return false;
}

int main()
{

    int n = 9;
    int board[9][9] = {
        {0, 0, 7, 1, 0, 0, 0, 6, 0},
        {1, 0, 5, 2, 0, 8, 0, 0, 0},
        {6, 0, 0, 0, 0, 7, 1, 2, 0},
        {3, 1, 2, 4, 0, 5, 0, 0, 8},
        {0, 0, 6, 0, 9, 0, 2, 0, 0},
        {0, 0, 0, 0, 0, 3, 0, 0, 1},
        {0, 0, 1, 0, 0, 4, 9, 8, 6},
        {8, 0, 3, 9, 0, 6, 0, 0, 0},
        {0, 6, 0, 0, 8, 2, 7, 0, 3},
    };

    SudukoSolver(board, 0, 0, n);

    return 0;
}